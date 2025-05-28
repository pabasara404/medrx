import { useForm } from '@inertiajs/react';

export default function UserQuotations({ quotations = [] }) {
    const { data, setData, post, processing } = useForm({
        response: '',
    });

    const handleResponse = (quotationId, response) => {
        setData('response', response);
        post(
            route('quotations.respond', { quotation: quotationId }),
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Your Quotations</h1>

            {quotations.length === 0 && (
                <p className="text-gray-500">No quotations yet.</p>
            )}

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

                return (
                    <div key={q.id} className="border rounded p-4 mb-6 shadow">
                        <p className="mb-2"><strong>Prescription ID:</strong> {q.prescription_id}</p>
                        <p className="mb-2"><strong>Status:</strong>
                            <span className={`ml-2 px-2 py-1 rounded text-sm ${
                                q.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                    q.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                            }`}>
                                {q.status || 'quoted'}
                            </span>
                        </p>

                        {items.length > 0 ? (
                            <table className="w-full mb-2 table-auto border-collapse border border-gray-300">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-2 py-1 text-left">Drug</th>
                                    <th className="border border-gray-300 px-2 py-1 text-left">Quantity</th>
                                    <th className="border border-gray-300 px-2 py-1 text-left">Unit Price</th>
                                    <th className="border border-gray-300 px-2 py-1 text-left">Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {items.map((item, index) => {
                                    const qty = item.qty || item.quantity || 0;
                                    const unitPrice = item.unit_price || 0;
                                    const amount = qty * unitPrice;

                                    return (
                                        <tr key={item.id || index}>
                                            <td className="border border-gray-300 px-2 py-1">{item.drug || 'N/A'}</td>
                                            <td className="border border-gray-300 px-2 py-1">{qty}</td>
                                            <td className="border border-gray-300 px-2 py-1">${unitPrice.toFixed(2)}</td>
                                            <td className="border border-gray-300 px-2 py-1">${amount.toFixed(2)}</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td colSpan="3" className="text-right font-semibold px-2 py-1 border border-gray-300">Total</td>
                                    <td className="font-semibold px-2 py-1 border border-gray-300">${total.toFixed(2)}</td>
                                </tr>
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500 mb-4">No items found in this quotation.</p>
                        )}

                        {(!q.status || q.status === 'quoted') && (
                            <div className="flex gap-4 mt-4">
                                <button
                                    disabled={processing}
                                    onClick={() => handleResponse(q.id, 'accepted')}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                                >
                                    Accept
                                </button>
                                <button
                                    disabled={processing}
                                    onClick={() => handleResponse(q.id, 'rejected')}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
