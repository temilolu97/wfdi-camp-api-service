const { verifyPayment } = require("../integrations/BudpayIntegration");
const { Registration, PaymentTransaction, ProviderLog } = require("../models");

const receiveWebhook = async (req, res) => {
    const payload = req.body;
    try {
        const log = await ProviderLog.create({
            type: "BUDPAY-HOOK",
            requestContent: JSON.stringify(payload),
            Message: "Hook Received",
        });

        // fire-and-forget: don't await, so the response below returns immediately
        handleBudpayWebhook(log).catch(async (err) => {
            console.error(`Webhook processing failed for log ${log.id}:`, err);
            await ProviderLog.update(
                {
                    Message: `Processing failed: ${err.message},`,
                    Status: "Treated"
                },
                { where: { id: log.id } }
            );
        });
        return res.status(200).json({ message: "Received" });

    }
    catch (err) {
        console.log(err.message)
    }


};

const handleBudpayWebhook = async (log) => {
    const payload = JSON.parse(log.requestContent);
    const { reference } = payload.data;

    const tx = await PaymentTransaction.findOne({ where: { reference } });
    if (!tx) {
        await ProviderLog.update(
            { Message: `Unknown reference: ${reference}` },
            { where: { id: log.id } }
        );
        return;
    }

    // idempotency guard — don't reprocess a webhook retry
    if (tx.status === "Successful") {
        await ProviderLog.update(
            { Message: "Already processed, skipped" },
            { where: { id: log.id } }
        );
        return;
    }

    const verified = await verifyPayment(reference);

    tx.providerReference = verified.data.id;

    if (verified.data.status === "success") {
        tx.status = "Successful";
        await tx.save();

        await Registration.update(
            { registrationStatus: "CONFIRMED" },
            { where: { id: tx.registrationId } }
        );
    } else {
        tx.status = "Failed";
        await tx.save();
    }

    await ProviderLog.update(
        { Message: `Processed, tx status: ${tx.status}` },
        { where: { id: log.id } }
    );
};

module.exports = { receiveWebhook };