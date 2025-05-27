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
                const total = q.items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);

                return (
                    <div key={q.id} className="border rounded p-4 mb-6 shadow">
                        <p className="mb-2"><strong>Prescription ID:</strong> {q.prescription_id}</p>

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
                            {q.items.map((item) => (
                                <tr key={item.id}>
                                    <td className="border border-gray-300 px-2 py-1">{item.drug}</td>
                                    <td className="border border-gray-300 px-2 py-1">{item.quantity}</td>
                                    <td className="border border-gray-300 px-2 py-1">${item.unit_price.toFixed(2)}</td>
                                    <td className="border border-gray-300 px-2 py-1">${(item.quantity * item.unit_price).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3" className="text-right font-semibold px-2 py-1">Total</td>
                                <td className="font-semibold px-2 py-1">${total.toFixed(2)}</td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="flex gap-4 mt-4">
                            <button
                                disabled={processing}
                                onClick={() => handleResponse(q.id, 'accepted')}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Accept
                            </button>
                            <button
                                disabled={processing}
                                onClick={() => handleResponse(q.id, 'rejected')}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
