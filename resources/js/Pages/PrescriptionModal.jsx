import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function PrescriptionModal({ prescription, isOpen, onClose }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        items: [{ drug: '', qty: '', unit_price: '' }]
    });

    const addItem = () => {
        setData('items', [...data.items, { drug: '', qty: '', unit_price: '' }]);
    };

    const removeItem = (index) => {
        const newItems = data.items.filter((_, i) => i !== index);
        setData('items', newItems.length > 0 ? newItems : [{ drug: '', qty: '', unit_price: '' }]);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;
        setData('items', newItems);
    };

    const calculateTotal = () => {
        return data.items.reduce((total, item) => {
            const amount = (parseFloat(item.qty) || 0) * (parseFloat(item.unit_price) || 0);
            return total + amount;
        }, 0);
    };

    const handleSubmit = () => {
        post(route('quotations.store', prescription.id), {
            onSuccess: () => {
                reset();
                onClose();
            }
        });
    };

    if (!isOpen || !prescription) return null;

    const images = prescription.images ? JSON.parse(prescription.images) : [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold">Prescription Details & Quotation</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Side - Prescription Images */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Prescription Images</h3>

                            {/* Patient Info */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p><strong>Patient:</strong> {prescription.user?.name}</p>
                                <p><strong>Email:</strong> {prescription.user?.email}</p>
                                <p><strong>Note:</strong> {prescription.note}</p>
                                <p><strong>Delivery Address:</strong> {prescription.delivery_address}</p>
                                <p><strong>Delivery Slot:</strong> {prescription.delivery_slot}</p>
                                <p><strong>Uploaded:</strong> {new Date(prescription.created_at).toLocaleString()}</p>
                            </div>

                            {/* Main Image Display */}
                            {images.length > 0 && (
                                <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[300px] flex items-center justify-center bg-gray-50">
                                    <img
                                        src={`/storage/${images[selectedImageIndex]}`}
                                        alt={`Prescription ${selectedImageIndex + 1}`}
                                        className="max-w-full max-h-[400px] object-contain rounded"
                                    />
                                </div>
                            )}

                            {/* Image Thumbnails */}
                            {images.length > 1 && (
                                <div className="flex gap-2 flex-wrap">
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`border-2 rounded p-2 ${
                                                selectedImageIndex === index
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        >
                                            <img
                                                src={`/storage/${image}`}
                                                alt={`Img ${index + 1}`}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {images.length === 0 && (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                                    No prescription images available
                                </div>
                            )}
                        </div>

                        {/* Right Side - Quotation Form */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Prepare Quotation</h3>

                            <div className="space-y-4">
                                {/* Current Items Table */}
                                {data.items.some(item => item.drug || item.qty || item.unit_price) && (
                                    <div className="border rounded-lg overflow-hidden">
                                        <table className="w-full">
                                            <thead className="bg-gray-100">
                                            <tr>
                                                <th className="text-left p-3 font-semibold">Drug</th>
                                                <th className="text-left p-3 font-semibold">Quantity</th>
                                                <th className="text-left p-3 font-semibold">Unit Price</th>
                                                <th className="text-left p-3 font-semibold">Amount</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {data.items.map((item, index) => {
                                                if (!item.drug && !item.qty && !item.unit_price) return null;
                                                const amount = (parseFloat(item.qty) || 0) * (parseFloat(item.unit_price) || 0);
                                                return (
                                                    <tr key={index} className="border-t">
                                                        <td className="p-3">{item.drug}</td>
                                                        <td className="p-3">{item.qty}</td>
                                                        <td className="p-3">${parseFloat(item.unit_price || 0).toFixed(2)}</td>
                                                        <td className="p-3 font-semibold">${amount.toFixed(2)}</td>
                                                    </tr>
                                                );
                                            })}
                                            <tr className="border-t bg-gray-50">
                                                <td colSpan="3" className="p-3 text-right font-semibold">Total:</td>
                                                <td className="p-3 font-bold text-lg">${calculateTotal().toFixed(2)}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Add Items Section */}
                                <div className="space-y-4">
                                    {data.items.map((item, index) => (
                                        <div key={index} className="border rounded-lg p-4 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-medium">Item {index + 1}</h4>
                                                {data.items.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 gap-3">
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Drug Name</label>
                                                    <input
                                                        type="text"
                                                        value={item.drug}
                                                        onChange={(e) => updateItem(index, 'drug', e.target.value)}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="Enter drug name"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Quantity</label>
                                                        <input
                                                            type="number"
                                                            value={item.qty}
                                                            onChange={(e) => updateItem(index, 'qty', e.target.value)}
                                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Qty"
                                                            min="1"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Unit Price ($)</label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            value={item.unit_price}
                                                            onChange={(e) => updateItem(index, 'unit_price', e.target.value)}
                                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="0.00"
                                                            min="0"
                                                        />
                                                    </div>
                                                </div>

                                                {item.qty && item.unit_price && (
                                                    <div className="text-right">
                                                        <span className="text-sm text-gray-600">Amount: </span>
                                                        <span className="font-semibold">
                                                            ${((parseFloat(item.qty) || 0) * (parseFloat(item.unit_price) || 0)).toFixed(2)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add Item Button */}
                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2"
                                    >
                                        <Plus size={20} />
                                        Add Another Item
                                    </button>
                                </div>

                                {/* Error Display */}
                                {Object.keys(errors).length > 0 && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <h4 className="text-red-800 font-medium mb-2">Please fix the following errors:</h4>
                                        <ul className="text-red-700 text-sm space-y-1">
                                            {Object.values(errors).map((error, index) => (
                                                <li key={index}>• {error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Total and Submit */}
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xl font-semibold">Total Amount:</span>
                                        <span className="text-2xl font-bold text-green-600">
                                            ${calculateTotal().toFixed(2)}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={processing || data.items.every(item => !item.drug)}
                                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Sending...' : 'Send Quotation'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
