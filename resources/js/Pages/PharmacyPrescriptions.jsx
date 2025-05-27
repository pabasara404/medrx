export default function PharmacyPrescriptions({ prescriptions = [] }) {
    if (prescriptions.length === 0) {
        return <p className="text-gray-600">No prescriptions uploaded yet.</p>;
    }

    return (
        <div className="space-y-4">
            {prescriptions.map((prescription) => (
                <div
                    key={prescription.id}
                    className="p-4 border rounded shadow-sm bg-gray-50"
                >
                    <h4 className="font-semibold">{prescription.user?.name}</h4>
                    <p>Email: {prescription.user?.email}</p>
                    <div className="flex gap-4 flex-wrap">
                        {JSON.parse(prescription.images).map((imagePath, index) => (
                            <img
                                key={index}
                                src={`/storage/${imagePath}`}
                                alt={`Prescription ${index + 1}`}
                                className="mt-2 h-40 object-contain"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
