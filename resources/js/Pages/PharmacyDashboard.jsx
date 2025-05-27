import { useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function PharmacyDashboard({ prescriptions }) {
    const [selectedPrescription, setSelectedPrescription] = useState(null);

    const { data, setData, post, reset, processing, errors } = useForm({
        prescription_id: '',
        items: [{ drug: '', quantity: '', unit_price: '' }],
    });

    const handleSelect = (prescription) => {
        setSelectedPrescription(prescription);
        reset(); // reset form for new prescription
        setData('prescription_id', prescription.id);
    };

    const addItem = () => {
        setData('items', [...data.items, { drug: '', quantity: '', unit_price: '' }]);
    };

    const handleChange = (index, field, value) => {
        const updatedItems = [...data.items];
        updatedItems[index][field] = value;
        setData('items', updatedItems);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('quotations.store'), {
            preserveScroll: true,
            onSuccess: () => {
                alert('Quotation sent');
                setSelectedPrescription(null);
            },
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Pharmacy Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Uploaded Prescriptions</h2>
                    <ul className="space-y-2">
                        {prescriptions.map((p) => (
                            <li key={p.id} className="border p-4 rounded shadow">
                                <p><strong>User:</strong> {p.user.name}</p>
                                <p><strong>Note:</strong> {p.note}</p>
                                <button
                                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                                    onClick={() => handleSelect(p)}
                                >
                                    Prepare Quotation
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {selectedPrescription && (
                    <div className="border p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Prepare Quotation</h2>
                        <form onSubmit={submit} className="space-y-4">
                            {data.items.map((item, index) => (
                                <div key={index} className="grid grid-cols-3 gap-2">
                                    <input
                                        type="text"
                                        placeholder="Drug"
                                        className="border p-1"
                                        value={item.drug}
                                        onChange={(e) => handleChange(index, 'drug', e.target.value)}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Quantity"
                                        className="border p-1"
                                        value={item.quantity}
                                        onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                        required
                                    />
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Unit Price"
                                        className="border p-1"
                                        value={item.unit_price}
                                        onChange={(e) => handleChange(index, 'unit_price', e.target.value)}
                                        required
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={addItem} className="bg-gray-700 text-white px-3 py-1 rounded">
                                Add Item
                            </button>

                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded"
                                disabled={processing}
                            >
                                Send Quotation
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
