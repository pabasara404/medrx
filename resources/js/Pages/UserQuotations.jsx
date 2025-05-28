import { router } from '@inertiajs/react';
import { CheckCircle, XCircle, Clock, Mail, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function UserQuotations({ quotations = [] }) {
    const [processing, setProcessing] = useState(false);

    const handleResponse = (quotationId, response) => {
        setProcessing(true);

        router.post(route('quotations.respond', { quotation: quotationId }), {
            response: response
        }, {
            preserveScroll: true,
            onSuccess: () => {
                console.log(`Quotation ${response} successfully`);
                setProcessing(false);
            },
            onError: (errors) => {
                console.error('Error responding to quotation:', errors);
                setProcessing(false);
            },
            onFinish: () => {
                setProcessing(false);
            }
        });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'accepted': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
            case 'quoted': return <Mail className="w-4 h-4 text-blue-500" />;
            default: return <Clock className="w-4 h-4 text-yellow-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            case 'quoted': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Quotations</h1>
                <p className="text-gray-600">Review and respond to pharmacy quotations for your prescriptions</p>
            </div>

            {quotations.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No quotations yet</h3>
                    <p className="text-gray-500">Quotations from pharmacies will appear here once they respond to your prescriptions.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {quotations.map((q) => {
                        // Safely parse items - handle both string and array cases
                        let items = [];
                        if (typeof q.items === 'string') {
                            try {
                                items = JSON.parse(q.items);
                            } catch (e) {
                                console.error('Failed to parse items JSON:', e);
                                items = [];
                            }
                        } else if (Array.isArray(q.items)) {
                            items = q.items;
                        }

                        // Calculate total safely
                        const total = items.reduce((sum, item) => {
                            const qty = item.qty || item.quantity || 0;
                            const unitPrice = item.unit_price || 0;
                            return sum + (qty * unitPrice);
                        }, 0);

                        const currentStatus = q.status || 'quoted';

                        return (
                            <div key={q.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                {/* Header */}
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Prescription #{q.prescription_id}
                                            </h3>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(currentStatus)}`}>
                                                {getStatusIcon(currentStatus)}
                                                <span className="ml-1.5 capitalize">{currentStatus}</span>
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Quotation #{q.id}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {items.length > 0 ? (
                                        <div className="mb-6">
                                            <h4 className="text-sm font-medium text-gray-900 mb-3">Quoted Items</h4>
                                            <div className="overflow-x-auto">
                                                <table className="w-full border-collapse border border-gray-300 rounded-md">
                                                    <thead>
                                                    <tr className="bg-gray-50">
                                                        <th className="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Drug Name
                                                        </th>
                                                        <th className="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Quantity
                                                        </th>
                                                        <th className="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Unit Price
                                                        </th>
                                                        <th className="border border-gray-300 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Amount
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                    {items.map((item, index) => {
                                                        const qty = item.qty || item.quantity || 0;
                                                        const unitPrice = item.unit_price || 0;
                                                        const amount = qty * unitPrice;

                                                        return (
                                                            <tr key={item.id || index} className="hover:bg-gray-50">
                                                                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900">
                                                                    {item.drug || 'N/A'}
                                                                </td>
                                                                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                                                                    {qty}
                                                                </td>
                                                                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                                                                    Rs. {unitPrice.toFixed(2)}
                                                                </td>
                                                                <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900">
                                                                    Rs. {amount.toFixed(2)}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                    </tbody>
                                                    <tfoot>
                                                    <tr className="bg-gray-50">
                                                        <td colSpan="3" className="border border-gray-300 px-4 py-3 text-right text-sm font-semibold text-gray-900">
                                                            Total Amount:
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-3 text-sm font-bold text-green-600 flex items-center">
                                                            <DollarSign className="w-4 h-4 mr-1" />
                                                            Rs. {total.toFixed(2)}
                                                        </td>
                                                    </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500 mb-4">No items found in this quotation.</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    {(!q.status || q.status === 'quoted') && (
                                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-600 mb-3">
                                                    Please review the quotation above and choose your response:
                                                </p>
                                                <div className="flex gap-3">
                                                    <button
                                                        disabled={processing}
                                                        onClick={() => handleResponse(q.id, 'accepted')}
                                                        className="flex-1 sm:flex-none bg-green-600 text-white px-6 py-2.5 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                        Accept Quotation
                                                    </button>
                                                    <button
                                                        disabled={processing}
                                                        onClick={() => handleResponse(q.id, 'rejected')}
                                                        className="flex-1 sm:flex-none bg-red-600 text-white px-6 py-2.5 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                        Reject Quotation
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Status Message for Completed Actions */}
                                    {q.status && q.status !== 'quoted' && (
                                        <div className="pt-4 border-t border-gray-200">
                                            <div className={`p-3 rounded-md ${
                                                q.status === 'accepted'
                                                    ? 'bg-green-50 border border-green-200'
                                                    : 'bg-red-50 border border-red-200'
                                            }`}>
                                                <p className={`text-sm font-medium ${
                                                    q.status === 'accepted' ? 'text-green-800' : 'text-red-800'
                                                }`}>
                                                    {q.status === 'accepted'
                                                        ? '✓ You have accepted this quotation. The pharmacy will contact you for delivery arrangements.'
                                                        : '✗ You have rejected this quotation. You may receive a revised quote from the pharmacy.'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer with dates */}
                                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Created: {new Date(q.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</span>
                                        {q.updated_at && q.updated_at !== q.created_at && (
                                            <span>Updated: {new Date(q.updated_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
