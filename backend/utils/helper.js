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

// ✅ helper function to delete file from Firebase
const deleteFromFirebase = async (fileUrl) => {
    try {
        // Extract file path from the public URL
        const baseUrl = `https://storage.googleapis.com/${bucket.name}/`;
        if (!fileUrl.startsWith(baseUrl)) {
            throw new Error("Invalid Firebase file URL");
        }

        const filePath = fileUrl.replace(baseUrl, ""); // e.g. "products/12345-image.png"
        const file = bucket.file(filePath);

        // Delete the file
        await file.delete();
        return { success: true, message: "File deleted successfully" };
    } catch (error) {
        console.error("Error deleting file:", error.message);
        return { success: false, message: error.message };
    }
};


module.exports = { uploadBase64ToFirebase, deleteFromFirebase };