const bucket = require("../config/firebase");

// Helper function to upload a single file buffer to Firebase
const uploadBase64ToFirebase = async (base64String, fileName) => {
    // Strip metadata prefix like "data:image/jpeg;base64,"
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Detect MIME type from extension
    let mimeType = "image/jpeg";
    if (fileName.endsWith(".png")) mimeType = "image/png";
    else if (fileName.endsWith(".webp")) mimeType = "image/webp";

    const file = bucket.file(`products/${Date.now()}-${fileName}`);
    await file.save(buffer, {
        contentType: mimeType,
        public: true,
    });

    return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
};

module.exports = { uploadBase64ToFirebase };