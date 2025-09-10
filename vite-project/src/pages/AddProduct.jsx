import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, X, Eye, Camera, Image } from 'lucide-react';
import axios from "axios";

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

        // Product Details
        dimensions: { length: '', width: '', height: '' },
        color: '',
        material: '',

        // Business Details
        minimumOrderQuantity: '',
        status: 'active',

        // Images
        mainImage: null,
        additionalImages: []
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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

    const handleMainImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Not valid file type");
            e.target.value = "";
            setFormData(prev => ({
                ...prev,
                mainImage: null
            }));
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB size check
            toast.error("File size is too large");
            e.target.value = "";
            setFormData(prev => ({
                ...prev,
                mainImage: null
            }));
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setFormData(prev => ({
                ...prev,
                mainImage: {
                    file: file,
                    url: event.target.result,
                    name: file.name
                }
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleAdditionalImagesUpload = (e) => {
        const files = Array.from(e.target.files);
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 5 * 1024 * 1024; // 5MB

        const validFiles = [];

        files.forEach(file => {
            if (!allowedTypes.includes(file.type)) {
                toast.error(`${file.name} - invalid file type`);
                return; // skip invalid file
            }

            if (file.size > maxSize) {
                toast.error(`${file.name} - file too large`);
                return; // skip too big
            }

            validFiles.push(file);
        });

        // Reset input if no valid files
        if (validFiles.length === 0) {
            e.target.value = "";
            setFormData(prev => ({
                ...prev,
                additionalImages: []
            }));
            return;
        }

        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    additionalImages: [
                        ...prev.additionalImages,
                        {
                            file,
                            url: event.target.result,
                            name: file.name
                        }
                    ]
                }));
            };
            reader.readAsDataURL(file);
        });
    };


    const removeMainImage = () => {
        setFormData(prev => ({ ...prev, mainImage: null }));
    };

    const removeAdditionalImage = (index) => {
        setFormData(prev => ({
            ...prev,
            additionalImages: prev.additionalImages.filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
        if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.unitPrice) newErrors.unitPrice = 'Unit price is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.mainImage) newErrors.mainImage = 'Main product image is required';
        if (!formData.minimumOrderQuantity) newErrors.minimumOrderQuantity = "MOQ is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        console.log("Submit press")
        e.preventDefault();
        if (validateForm()) {
            try {
                setLoading(true);
                const response = await axios.post("/product/new", formData);
                if (response.status === 200) {
                    setFormData({
                        productName: '',
                        sku: '',
                        category: '',
                        subcategory: '',
                        description: '',
                        unitPrice: '',
                        bulkPricing: [{ quantity: '', price: '' }],
                        taxable: false,
                        dimensions: { length: '', width: '', height: '' },
                        color: '',
                        material: '',
                        minimumOrderQuantity: '',
                        status: 'active',
                        mainImage: null,
                        additionalImages: []
                    })
                    toast.success("Product Added 🎉");
                    setLoading(false)
                }
            } catch (error) {
                if (error.response) {
                    // ✅ express-validator errors
                    if (error.response.data.errors) {
                        error.response.data.errors.forEach((err) => {
                            toast.error(err.msg);
                        });
                    }
                    // ✅ custom backend message (e.g. duplicate email)
                    else if (error.response.data.message) {
                        toast.error(error.response.data.message);
                    }
                    // fallback
                    else {
                        toast.error("Something went wrong 😢");
                    }
                } else {
                    toast.error("Server not reachable 🚨");
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-25 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
                    <p className="mt-2 text-gray-500">Create a new product for your B2B catalog</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Left Side */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Basic Information */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    Basic Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.productName}
                                            onChange={(e) => handleInputChange('productName', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${errors.productName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            placeholder="Enter product name"
                                        />
                                        {errors.productName && <p className="text-red-500 text-sm mt-2">{errors.productName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            SKU *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.sku}
                                            onChange={(e) => handleInputChange('sku', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${errors.sku ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            placeholder="e.g., PRD-001"
                                        />
                                        {errors.sku && <p className="text-red-500 text-sm mt-2">{errors.sku}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Category *
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${errors.category ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
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
                                        {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Subcategory
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.subcategory}
                                            onChange={(e) => handleInputChange('subcategory', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 transition-all"
                                            placeholder="Enter subcategory"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Detailed Description *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows="4"
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        placeholder="Detailed product description, features, specifications..."
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    Pricing
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Unit Price *
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3 text-gray-400 font-medium">&#8377;</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.unitPrice}
                                                onChange={(e) => handleInputChange('unitPrice', e.target.value)}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${errors.unitPrice ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                placeholder="0.00"
                                            />
                                        </div>
                                        {errors.unitPrice && <p className="text-red-500 text-sm mt-2">{errors.unitPrice}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Minimum Order Quantity
                                        </label>
                                        <div className='relative'>
                                            <input
                                                type="number"
                                                value={formData.minimumOrderQuantity}
                                                onChange={(e) => handleInputChange('minimumOrderQuantity', e.target.value)}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${errors.minimumOrderQuantity ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                placeholder="1"
                                            />
                                        </div>
                                        {errors.minimumOrderQuantity && <p className="text-red-500 text-sm mt-2">{errors.minimumOrderQuantity}</p>}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Bulk Pricing Tiers
                                        </label>
                                        <button
                                            type="button"
                                            onClick={addBulkPricing}
                                            className="flex items-center text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Tier
                                        </button>
                                    </div>

                                    {formData.bulkPricing.map((tier, index) => (
                                        <div key={index} className="flex items-center space-x-4 mb-4">
                                            <div className="flex-1">
                                                <input
                                                    type="number"
                                                    placeholder="Min quantity"
                                                    value={tier.quantity}
                                                    onChange={(e) => updateBulkPricing(index, 'quantity', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 transition-all"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="relative">
                                                    <span className="absolute left-4 top-3 text-gray-400 font-medium">&#8377;</span>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Price per unit"
                                                        value={tier.price}
                                                        onChange={(e) => updateBulkPricing(index, 'price', e.target.value)}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            {formData.bulkPricing.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeBulkPricing(index)}
                                                    className="text-red-400 hover:text-red-500 p-2 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.taxable}
                                            onChange={(e) => handleInputChange('taxable', e.target.checked)}
                                            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 focus:ring-2"
                                        />
                                        <span className="ml-3 text-sm text-gray-700">This product is taxable</span>
                                    </label>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                    Product Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Color
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.color}
                                            onChange={(e) => handleInputChange('color', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 transition-all"
                                            placeholder="e.g., Black, White, Silver"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Material
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.material}
                                            onChange={(e) => handleInputChange('material', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 transition-all"
                                            placeholder="e.g., Steel, Plastic, Wood"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Dimensions (cm)
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Length"
                                            value={formData.dimensions.length}
                                            onChange={(e) => handleDimensionChange('length', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 transition-all"
                                        />
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Width"
                                            value={formData.dimensions.width}
                                            onChange={(e) => handleDimensionChange('width', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 transition-all"
                                        />
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Height"
                                            value={formData.dimensions.height}
                                            onChange={(e) => handleDimensionChange('height', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Right Side */}
                        <div className="lg:col-span-1 space-y-8">

                            {/* Status & Visibility */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                    Status
                                </h2>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Product Status
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 transition-all"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            {/* Main Product Image */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                                    Main Image *
                                </h2>
                                <div className="space-y-4">
                                    {!formData.mainImage ? (
                                        <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${errors.mainImage ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}>
                                            <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                            <p className="text-sm text-gray-600 mb-2">
                                                Upload main product image
                                            </p>
                                            <p className="text-xs text-gray-500 mb-4">
                                                PNG, JPG, WEBP up to 10MB
                                            </p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleMainImageUpload}
                                                className="hidden"
                                                id="main-image-upload"
                                            />
                                            <label
                                                htmlFor="main-image-upload"
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                                            >
                                                Choose Image
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <img
                                                src={formData.mainImage.url}
                                                alt="Main product"
                                                className="w-full h-48 object-cover rounded-xl border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeMainImage}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                    {errors.mainImage && <p className="text-red-500 text-sm">{errors.mainImage}</p>}
                                </div>
                            </div>

                            {/* Additional Images */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                    Additional Images
                                    <span className="ml-2 text-xs text-gray-500 font-normal">(Optional)</span>
                                </h2>
                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                                        <Image className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                                        <p className="text-sm text-gray-600 mb-2">
                                            Upload additional images
                                        </p>
                                        <p className="text-xs text-gray-500 mb-4">
                                            Multiple files accepted
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleAdditionalImagesUpload}
                                            className="hidden"
                                            id="additional-images-upload"
                                        />
                                        <label
                                            htmlFor="additional-images-upload"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            Choose Images
                                        </label>
                                    </div>

                                    {formData.additionalImages.length > 0 && (
                                        <div className="grid grid-cols-2 gap-3">
                                            {formData.additionalImages.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={image.url}
                                                        alt={`Additional ${index + 1}`}
                                                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeAdditionalImage(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
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
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="space-y-3">
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Preview Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100">
                        <button
                            type="button"
                            className="px-8 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all shadow-sm"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
            {loading && (
                <div className="mt-3 text-center">
                    <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full"></span>
                    <p className="text-gray-600 mt-2">Please wait...</p>
                </div>
            )}
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default AddProduct;