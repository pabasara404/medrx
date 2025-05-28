import React from 'react';
import { Eye, Clock, CheckCircle, XCircle, Mail, DollarSign, Calendar } from 'lucide-react';

export default function PrescriptionCard({ prescription, role, onView }) {
    const images = prescription.images ? JSON.parse(prescription.images) : [];
    const hasQuotation = prescription.quotations && prescription.quotations.length > 0;
    const latestQuotation = hasQuotation ? prescription.quotations[0] : null;

    // Determine the overall status
    const getOverallStatus = () => {
        if (!hasQuotation) {
            return 'pending';
        }
        return latestQuotation.status || 'quoted';
    };

    const status = getOverallStatus();

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="text-yellow-500" size={16} />;
            case 'quoted': return <Mail className="text-blue-500" size={16} />;
            case 'accepted': return <CheckCircle className="text-green-500" size={16} />;
            case 'rejected': return <XCircle className="text-red-500" size={16} />;
            default: return <Clock className="text-gray-500" size={16} />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Awaiting Quote';
            case 'quoted': return 'Quote Available';
            case 'accepted': return 'Quote Accepted';
            case 'rejected': return 'Quote Rejected';
            default: return 'Unknown Status';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'quoted': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getButtonText = () => {
        if (role === 'pharmacy') {
            return hasQuotation ? 'View & Update Quote' : 'Create Quote';
        }
        return 'View Details';
    };

    const getButtonColor = () => {
        if (role === 'pharmacy') {
            if (!hasQuotation) {
                return 'bg-green-600 hover:bg-green-700'; // Create quote - green
            } else if (status === 'quoted') {
                return 'bg-blue-600 hover:bg-blue-700'; // Update quote - blue
            } else {
                return 'bg-gray-600 hover:bg-gray-700'; // View only - gray
            }
        }
        return 'bg-indigo-600 hover:bg-indigo-700'; // User view - indigo
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            {/* Image Section */}
            <div className="aspect-video bg-gray-50 relative overflow-hidden">
                {images.length > 0 ? (
                    <>
                        <img
                            src={`/storage/${images[0]}`}
                            alt="Prescription preview"
                            className="w-full h-full object-cover"
                        />
                        {images.length > 1 && (
                            <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md font-medium">
                                +{images.length - 1} more
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Header with Status and ID */}
                <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                        {getStatusIcon(status)}
                        <span className="ml-1.5">{getStatusText(status)}</span>
                    </span>
                    <span className="text-xs text-gray-500 font-mono">#{prescription.id}</span>
                </div>

                {/* User Info for Pharmacy */}
                {role === 'pharmacy' && prescription.user && (
                    <div className="mb-3 p-2 bg-gray-50 rounded-md">
                        <p className="font-medium text-gray-900 text-sm">{prescription.user.name}</p>
                        <p className="text-xs text-gray-600">{prescription.user.email}</p>
                    </div>
                )}

                {/* Prescription Details */}
                <div className="space-y-2 mb-4">
                    <div>
                        <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">Note</p>
                        <p className="text-sm text-gray-900 line-clamp-2 mt-1">{prescription.note || 'No notes provided'}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <div>
                            <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">Delivery</p>
                            <p className="text-sm text-gray-900 flex items-center mt-1">
                                <Calendar size={14} className="mr-1 text-gray-400" />
                                {prescription.delivery_slot}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">Address</p>
                            <p className="text-sm text-gray-900 line-clamp-1 mt-1">{prescription.delivery_address}</p>
                        </div>
                    </div>
                </div>

                {/* Quotation Details */}
                {hasQuotation && latestQuotation && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-900 flex items-center">
                                <DollarSign size={16} className="mr-1" />
                                Quotation Total
                            </span>
                            <span className="text-lg font-bold text-blue-600">
                                Rs. {parseFloat(latestQuotation.total || 0).toFixed(2)}
                            </span>
                        </div>

                        {latestQuotation.updated_at && (
                            <div className="text-xs text-blue-600">
                                Updated: {new Date(latestQuotation.updated_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                            </div>
                        )}
                    </div>
                )}

                {/* Upload Date */}
                <div className="text-xs text-gray-500 mb-4 flex items-center">
                    <Calendar size={12} className="mr-1" />
                    Uploaded: {new Date(prescription.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })}
                </div>

                {/* Action Button */}
                <button
                    onClick={() => onView(prescription)}
                    className={`w-full px-4 py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-200 ${getButtonColor()} text-white`}
                >
                    <Eye size={16} />
                    {getButtonText()}
                </button>
            </div>
        </div>
    );
}
