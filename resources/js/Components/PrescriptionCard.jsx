import React from 'react';
import { Eye, Clock, CheckCircle, XCircle, Mail } from 'lucide-react';

export default function PrescriptionCard({ prescription, role, onView }) {
    const images = prescription.images ? JSON.parse(prescription.images) : [];
    const hasQuotation = prescription.quotations && prescription.quotations.length > 0;
    const status = hasQuotation ? prescription.quotations[0].status || 'quoted' : 'pending';

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="text-yellow-500" size={20} />;
            case 'quoted': return <Mail className="text-blue-500" size={20} />;
            case 'accepted': return <CheckCircle className="text-green-500" size={20} />;
            case 'rejected': return <XCircle className="text-red-500" size={20} />;
            default: return <Clock className="text-gray-500" size={20} />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Pending Review';
            case 'quoted': return 'Quote Sent';
            case 'accepted': return 'Accepted';
            case 'rejected': return 'Rejected';
            default: return 'Unknown';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'quoted': return 'bg-blue-100 text-blue-800';
            case 'accepted': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden relative">
                {images.length > 0 ? (
                    <>
                        <img
                            src={`/storage/${images[0]}`}
                            alt="Prescription preview"
                            className="w-full h-full object-cover"
                        />
                        {images.length > 1 && (
                            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                +{images.length - 1} more
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {getStatusIcon(status)}
                        <span className="ml-1">{getStatusText(status)}</span>
                    </span>
                    <span className="text-xs text-gray-500">ID: #{prescription.id}</span>
                </div>

                {role === 'pharmacy' && prescription.user && (
                    <div className="mb-3">
                        <p className="font-medium text-gray-900">{prescription.user.name}</p>
                        <p className="text-sm text-gray-500">{prescription.user.email}</p>
                    </div>
                )}

                <div className="space-y-2 mb-4">
                    <div>
                        <p className="text-sm font-medium text-gray-700">Note:</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{prescription.note}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Delivery:</p>
                        <p className="text-sm text-gray-600">{prescription.delivery_slot}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Address:</p>
                        <p className="text-sm text-gray-600 line-clamp-1">{prescription.delivery_address}</p>
                    </div>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                    Uploaded: {new Date(prescription.created_at).toLocaleDateString()}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onView(prescription)}
                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2
                            ${role === 'pharmacy' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
                    >
                        <Eye size={16} />
                        {role === 'pharmacy'
                            ? (hasQuotation ? 'View & Update' : 'Create Quote')
                            : 'View Details'}
                    </button>
                </div>

                {hasQuotation && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Quote Total:</span>
                            <span className="font-semibold text-green-600">
                                ${parseFloat(prescription.quotations[0].total || 0).toFixed(2)}
                            </span>
                        </div>
                        {prescription.quotations[0].updated_at && (
                            <div className="text-xs text-gray-500 mt-1">
                                Last updated: {new Date(prescription.quotations[0].updated_at).toLocaleDateString()}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
