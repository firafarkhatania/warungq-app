const QRCode = require('qrcode'); 
exports.generatePaymentQR = async (req, res) =
    try { 
        const { total, transactionId, items } = req.body; 
        const qrCode = await QRCode.toDataURL(JSON.stringify(paymentData)); 
        res.json({ success: true, qrCode: qrCode }); 
    } catch (error) { 
        res.status(500).json({ success: false, message: error.message }); 
    } 
}; 
exports.generateWhatsAppQR = async (req, res) =
    try { 
        const { total, transactionId } = req.body; 
        const waLink = 'https://wa.me/6281234567890?text=Bayar%20WarungQ%20' + transactionId; 
        const qrCode = await QRCode.toDataURL(waLink); 
        res.json({ success: true, qrCode: qrCode }); 
    } catch (error) { 
        res.status(500).json({ success: false, message: error.message }); 
    } 
