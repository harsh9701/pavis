import React, { useState } from 'react';
import { Plus, Upload, X, Save, Eye } from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "../config/firebase/firebase";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        // Basic Information
        productName: '',
        sku: '',
        category: '',
        subcategory: '',
        description: '',

        // Pricing
        unitPrice: '',
        bulkPricing: [{ quantity: '', price: '' }],
        taxable: false,

        // Inventory
        stockQuantity: '',
        lowStockThreshold: '',
        trackInventory: true,

        // Product Details
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        color: '',
        material: '',

        // Business Details
        minimumOrderQuantity: '',
        status: 'active',

        // Images
        images: []
    });

    const [newTag, setNewTag] = useState('');
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleDimensionChange = (dimension, value) => {
        setFormData(prev => ({
            ...prev,
            dimensions: { ...prev.dimensions, [dimension]: value }
        }));
    };

    const addBulkPricing = () => {
        setFormData(prev => ({
            ...prev,
            bulkPricing: [...prev.bulkPricing, { quantity: '', price: '' }]
        }));
    };

    const removeBulkPricing = (index) => {
        setFormData(prev => ({
            ...prev,
            bulkPricing: prev.bulkPricing.filter((_, i) => i !== index)
        }));
    };

    const updateBulkPricing = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            bulkPricing: prev.bulkPricing.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
        if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.unitPrice) newErrors.unitPrice = 'Unit price is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Product data:', formData);
            // Handle form submission
            alert('Product added successfully!');
        }
    };

    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (!files) return;

        Array.from(files).forEach((file) => {
            console.log(file.name);
            console.log(file);
            const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // optional: show upload progress
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    console.log("Failed");
                    console.error("Upload failed:", error);
                },
                () => {
                    // When upload completes, get the URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setFormData((prev) => ({
                            ...prev,
                            images: [...prev.images, { url: downloadURL }]
                        }));
                    });
                }
            );
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                    <p className="mt-2 text-gray-600">Create a new product for your B2B catalog</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Left Side */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Basic Information */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.productName}
                                            onChange={(e) => handleInputChange('productName', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.productName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter product name"
                                        />
                                        {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            SKU *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.sku}
                                            onChange={(e) => handleInputChange('sku', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.sku ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="e.g., PRD-001"
                                        />
                                        {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">Select category</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="machinery">Machinery</option>
                                            <option value="office-supplies">Office Supplies</option>
                                            <option value="raw-materials">Raw Materials</option>
                                            <option value="tools">Tools & Equipment</option>
                                            <option value="software">Software</option>
                                        </select>
                                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subcategory
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.subcategory}
                                            onChange={(e) => handleInputChange('subcategory', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter subcategory"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Detailed Description *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows="4"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Detailed product description, features, specifications..."
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Unit Price *
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.unitPrice}
                                                onChange={(e) => handleInputChange('unitPrice', e.target.value)}
                                                className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.unitPrice ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="0.00"
                                            />
                                        </div>
                                        {errors.unitPrice && <p className="text-red-500 text-sm mt-1">{errors.unitPrice}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Minimum Order Quantity
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.minimumOrderQuantity}
                                            onChange={(e) => handleInputChange('minimumOrderQuantity', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="1"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Bulk Pricing Tiers
                                        </label>
                                        <button
                                            type="button"
                                            onClick={addBulkPricing}
                                            className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Tier
                                        </button>
                                    </div>

                                    {formData.bulkPricing.map((tier, index) => (
                                        <div key={index} className="flex items-center space-x-4 mb-3">
                                            <div className="flex-1">
                                                <input
                                                    type="number"
                                                    placeholder="Min quantity"
                                                    value={tier.quantity}
                                                    onChange={(e) => updateBulkPricing(index, 'quantity', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="relative">
                                                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Price per unit"
                                                        value={tier.price}
                                                        onChange={(e) => updateBulkPricing(index, 'price', e.target.value)}
                                                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            {formData.bulkPricing.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeBulkPricing(index)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.taxable}
                                            onChange={(e) => handleInputChange('taxable', e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">This product is taxable</span>
                                    </label>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Weight (kg)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={formData.weight}
                                            onChange={(e) => handleInputChange('weight', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Color
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.color}
                                            onChange={(e) => handleInputChange('color', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Black, White, Silver"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Material
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.material}
                                            onChange={(e) => handleInputChange('material', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Steel, Plastic, Wood"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Dimensions (cm)
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Length"
                                            value={formData.dimensions.length}
                                            onChange={(e) => handleDimensionChange('length', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Width"
                                            value={formData.dimensions.width}
                                            onChange={(e) => handleDimensionChange('width', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Height"
                                            value={formData.dimensions.height}
                                            onChange={(e) => handleDimensionChange('height', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Right Side */}
                        <div className="lg:col-span-1 space-y-8">

                            {/* Status & Visibility */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Status & Visibility</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Status
                                        </label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => handleInputChange('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="discontinued">Discontinued</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Inventory Management */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Inventory</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="flex items-center mb-4">
                                            <input
                                                type="checkbox"
                                                checked={formData.trackInventory}
                                                onChange={(e) => handleInputChange('trackInventory', e.target.checked)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Track inventory for this product</span>
                                        </label>
                                    </div>

                                    {formData.trackInventory && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Stock Quantity
                                                </label>
                                                <input
                                                    type="number"
                                                    value={formData.stockQuantity}
                                                    onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="0"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Low Stock Threshold
                                                </label>
                                                <input
                                                    type="number"
                                                    value={formData.lowStockThreshold}
                                                    onChange={(e) => handleInputChange('lowStockThreshold', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="10"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Product Images */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Main Image</h2>
                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <p className="text-sm text-gray-600 mb-2">
                                            Drag and drop images here, or click to browse
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, WEBP up to 10MB each
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            id="image-upload"
                                            onChange={handleImageUpload}
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                                        >
                                            Choose Files
                                        </label>
                                    </div>

                                    {formData.images.length > 0 && (
                                        <div className="grid grid-cols-2 gap-4">
                                            {formData.images.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={image.url}
                                                        alt={`Product ${index + 1}`}
                                                        className="w-full h-24 object-cover rounded-md border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                images: prev.images.filter((_, i) => i !== index)
                                                            }));
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="space-y-4">
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Preview Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;