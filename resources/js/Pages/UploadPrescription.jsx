import {useForm, usePage} from '@inertiajs/react'

export default function UploadPrescription() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        images: [],
        note: '',
        delivery_address: '',
        delivery_slot: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('prescriptions.store'), {
            onSuccess: () => {
                setData({
                    images: [],
                    note: '',
                    delivery_address: '',
                    delivery_slot: ''
                });
                document.getElementById('imageInput').value = null;
            },
        });
    };

    return (
        <form onSubmit={submit} className="p-4 space-y-4">
            {flash.success && <div className="text-green-600">{flash.success}</div>}
            <input id="imageInput" type="file" multiple accept="image/*" onChange={(e) => setData('images', e.target.files)} />
            <textarea className="w-full border" value={data.note} onChange={(e) => setData('note', e.target.value)} placeholder="Note" />
            <input className="w-full border" value={data.delivery_address} onChange={(e) => setData('delivery_address', e.target.value)} placeholder="Delivery Address" />
            <select className="w-full border" value={data.delivery_slot} onChange={(e) => setData('delivery_slot', e.target.value)}>
                <option value="">Select Slot</option>
                <option value="08:00 - 10:00">08:00 - 10:00</option>
                <option value="10:00 - 12:00">10:00 - 12:00</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" disabled={processing}>Upload</button>
        </form>
    );
}
