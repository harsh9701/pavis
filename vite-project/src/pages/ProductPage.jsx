import React, { useState } from 'react';
import {
    Star,
    Heart,
    Share2,
    ShoppingCart,
    Truck,
    Shield,
    Award,
    Download,
    ChevronLeft,
    ChevronRight,
    Plus,
    Minus,
    Info,
    Phone,
    Mail,
    Calendar,
    Package,
    FileText,
    Users
} from 'lucide-react';

const ProductPage = () => {
    // Sample product data
    const product = {
        id: "PRD-001",
        name: "Industrial Grade Steel Bearing Set",
        sku: "ISB-2024-001",
        brand: "SteelTech Pro",
        category: "Industrial Components",
        subcategory: "Bearings & Bushings",
        rating: 4.8,
        reviewCount: 127,
        shortDescription: "High-precision industrial steel bearing set designed for heavy-duty manufacturing applications with extended durability.",
        description: "Our Industrial Grade Steel Bearing Set represents the pinnacle of precision engineering for demanding industrial applications. Manufactured using premium grade steel alloy and advanced heat treatment processes, these bearings deliver exceptional performance in high-load, high-speed environments. Each bearing undergoes rigorous quality testing to ensure dimensional accuracy within ±0.001mm tolerance levels.",
        unitPrice: 245.99,
        currency: "USD",
        minimumOrderQuantity: 10,
        stockQuantity: 1247,
        lowStockThreshold: 50,
        leadTime: 5,
        warrantyPeriod: "2 years",
        weight: 2.5,
        dimensions: { length: 15.2, width: 15.2, height: 8.5 },
        material: "High-grade Steel Alloy",
        manufacturer: "SteelTech Industries",
        manufacturerPartNumber: "STI-BRG-001",
        bulkPricing: [
            { quantity: 10, price: 245.99 },
            { quantity: 50, price: 229.99 },
            { quantity: 100, price: 219.99 },
            { quantity: 500, price: 199.99 }
        ],
        specifications: [
            { label: "Load Capacity", value: "5000 N" },
            { label: "Operating Temperature", value: "-40°C to +180°C" },
            { label: "Speed Rating", value: "15,000 RPM" },
            { label: "Precision Class", value: "ABEC-7" },
            { label: "Lubrication", value: "High-grade synthetic grease" },
            { label: "Cage Material", value: "Steel" },
            { label: "Seal Type", value: "Contact seal (2RS)" },
            { label: "Radial Clearance", value: "C3" }
        ],
        features: [
            "Premium grade steel construction for maximum durability",
            "Advanced heat treatment for extended service life",
            "Precision ground raceways for smooth operation",
            "High-quality synthetic grease lubrication",
            "Contact seals for enhanced contamination protection",
            "Suitable for high-speed and high-load applications",
            "Meets international quality standards (ISO 9001)",
            "Available in various sizes and configurations"
        ],
        applications: [
            "Heavy machinery and equipment",
            "Automotive manufacturing",
            "Aerospace applications",
            "Industrial pumps and compressors",
            "Electric motors and generators",
            "Conveyor systems",
            "Machine tools and equipment"
        ],
        images: [
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1581092160582-fe3cd7e8e2a8?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop"
        ],
        certifications: [
            "ISO 9001:2015",
            "ISO/TS 16949",
            "REACH Compliant",
            "RoHS Compliant"
        ],
        documents: [
            { name: "Product Datasheet", type: "PDF", size: "2.1 MB" },
            { name: "Technical Specifications", type: "PDF", size: "1.8 MB" },
            { name: "Installation Guide", type: "PDF", size: "3.2 MB" },
            { name: "Maintenance Manual", type: "PDF", size: "2.9 MB" }
        ]
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(product.minimumOrderQuantity);
    const [selectedTab, setSelectedTab] = useState('description');

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const calculateBulkPrice = (qty) => {
        const applicable = product.bulkPricing
            .filter(tier => qty >= tier.quantity)
            .sort((a, b) => b.quantity - a.quantity);

        return applicable.length > 0 ? applicable[0].price : product.unitPrice;
    };

    const currentPrice = calculateBulkPrice(quantity);
    const totalPrice = currentPrice * quantity;
    const savings = quantity >= 50 ? (product.unitPrice - currentPrice) * quantity : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex text-sm text-gray-600">
                        <span>Home</span>
                        <span className="mx-2">/</span>
                        <span>{product.category}</span>
                        <span className="mx-2">/</span>
                        <span>{product.subcategory}</span>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.name}
                                className="w-full h-96 object-cover"
                            />

                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}

                            <div className="absolute top-4 right-4 flex space-x-2">
                                <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md">
                                    <Heart className="w-5 h-5" />
                                </button>
                                <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        {product.images.length > 1 && (
                            <div className="flex space-x-2 overflow-x-auto">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden ${index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Information */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{product.brand}</span>
                                <span>SKU: {product.sku}</span>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating)
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm text-gray-600">
                                        {product.rating} ({product.reviewCount} reviews)
                                    </span>
                                </div>

                                <div className="flex items-center text-sm text-green-600">
                                    <Package className="w-4 h-4 mr-1" />
                                    In Stock ({product.stockQuantity} available)
                                </div>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed">
                                {product.shortDescription}
                            </p>
                        </div>

                        {/* Pricing */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-3xl font-bold text-gray-900">
                                            ${currentPrice.toFixed(2)}
                                        </span>
                                        <span className="text-gray-600">per unit</span>
                                        {quantity >= 50 && (
                                            <span className="text-sm text-green-600 font-medium">
                                                Save ${savings.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    {quantity !== product.minimumOrderQuantity && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            List price: ${product.unitPrice.toFixed(2)} per unit
                                        </p>
                                    )}
                                </div>

                                {/* Bulk Pricing Tiers */}
                                <div className="border-t pt-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Volume Pricing</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        {product.bulkPricing.map((tier, index) => (
                                            <div
                                                key={index}
                                                className={`flex justify-between p-2 rounded ${quantity >= tier.quantity
                                                        ? 'bg-blue-50 text-blue-900'
                                                        : 'text-gray-600'
                                                    }`}
                                            >
                                                <span>{tier.quantity}+ units</span>
                                                <span>${tier.price.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity Selector */}
                                <div className="border-t pt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Quantity (Min: {product.minimumOrderQuantity})
                                    </label>
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                            <button
                                                onClick={() => setQuantity(Math.max(product.minimumOrderQuantity, quantity - 1))}
                                                className="p-2 hover:bg-gray-100"
                                                disabled={quantity <= product.minimumOrderQuantity}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.max(product.minimumOrderQuantity, parseInt(e.target.value) || product.minimumOrderQuantity))}
                                                className="w-20 px-3 py-2 text-center border-0 focus:outline-none"
                                                min={product.minimumOrderQuantity}
                                            />
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="p-2 hover:bg-gray-100"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-lg font-semibold text-gray-900">
                                                Total: ${totalPrice.toFixed(2)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Lead time: {product.leadTime} days
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-3 pt-4">
                                    <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center">
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        Add to Cart
                                    </button>
                                    <button className="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                                        Request Quote
                                    </button>
                                </div>

                                {/* Quick Info */}
                                <div className="grid grid-cols-3 gap-4 pt-4 text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <Truck className="w-4 h-4 mr-2" />
                                        Free shipping
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Shield className="w-4 h-4 mr-2" />
                                        {product.warrantyPeriod} warranty
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Award className="w-4 h-4 mr-2" />
                                        Quality certified
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Sales */}
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h4 className="font-medium text-blue-900 mb-2">Need a custom solution?</h4>
                            <p className="text-sm text-blue-700 mb-3">
                                Our sales team can help with bulk orders, custom specifications, and special pricing.
                            </p>
                            <div className="flex space-x-3">
                                <button className="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call Sales
                                </button>
                                <button className="flex items-center text-sm border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Email Quote
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mt-12">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8">
                            {[
                                { id: 'description', label: 'Description' },
                                { id: 'specifications', label: 'Specifications' },
                                { id: 'features', label: 'Features' },
                                { id: 'applications', label: 'Applications' },
                                { id: 'documents', label: 'Documents' },
                                { id: 'reviews', label: 'Reviews' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${selectedTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="py-8">
                        {selectedTab === 'description' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-lg text-gray-900 leading-relaxed mb-6">
                                            {product.description}
                                        </p>

                                        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Key Benefits</h3>
                                        <ul className="space-y-2">
                                            <li>• Exceptional load-bearing capacity for demanding industrial applications</li>
                                            <li>• Extended service life through advanced materials and manufacturing processes</li>
                                            <li>• Reduced maintenance costs and improved operational efficiency</li>
                                            <li>• Compliance with international quality and safety standards</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h4 className="font-semibold text-gray-900 mb-4">Product Details</h4>
                                    <dl className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <dt className="text-gray-600">Manufacturer:</dt>
                                            <dd className="text-gray-900">{product.manufacturer}</dd>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <dt className="text-gray-600">MPN:</dt>
                                            <dd className="text-gray-900">{product.manufacturerPartNumber}</dd>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <dt className="text-gray-600">Weight:</dt>
                                            <dd className="text-gray-900">{product.weight} kg</dd>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <dt className="text-gray-600">Dimensions:</dt>
                                            <dd className="text-gray-900">
                                                {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                                            </dd>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <dt className="text-gray-600">Material:</dt>
                                            <dd className="text-gray-900">{product.material}</dd>
                                        </div>
                                    </dl>

                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h5 className="font-medium text-gray-900 mb-3">Certifications</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {product.certifications.map((cert, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                                                >
                                                    {cert}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedTab === 'specifications' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <table className="w-full">
                                    <tbody className="divide-y divide-gray-200">
                                        {product.specifications.map((spec, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                                                    {spec.label}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {spec.value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {selectedTab === 'features' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {product.features.map((feature, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                        <p className="text-gray-900">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedTab === 'applications' && (
                            <div>
                                <p className="text-gray-600 mb-6">
                                    This product is ideal for a wide range of industrial applications:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {product.applications.map((application, index) => (
                                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-center space-x-3">
                                                <Users className="w-6 h-6 text-blue-600" />
                                                <span className="font-medium text-gray-900">{application}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedTab === 'documents' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {product.documents.map((doc, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start space-x-4">
                                            <FileText className="w-8 h-8 text-red-600" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-lg font-medium text-gray-900 truncate">
                                                    {doc.name}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {doc.type} • {doc.size}
                                                </p>
                                                <button className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-700">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedTab === 'reviews' && (
                            <div className="space-y-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                                            <div className="flex justify-center mt-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-5 h-5 ${i < Math.floor(product.rating)
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-600 mt-2">
                                                Based on {product.reviewCount} reviews
                                            </p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <div className="space-y-3">
                                                {[5, 4, 3, 2, 1].map((stars) => (
                                                    <div key={stars} className="flex items-center space-x-3">
                                                        <span className="text-sm text-gray-600 w-8">{stars}★</span>
                                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-yellow-400"
                                                                style={{
                                                                    width: `${stars === 5 ? 65 : stars === 4 ? 25 : stars === 3 ? 8 : stars === 2 ? 2 : 0}%`
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="text-sm text-gray-600 w-12">
                                                            {stars === 5 ? '82' : stars === 4 ? '32' : stars === 3 ? '10' : stars === 2 ? '2' : '1'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center text-gray-600">
                                    <p>Customer reviews help other businesses make informed purchasing decisions.</p>
                                    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                                        Write a Review
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;