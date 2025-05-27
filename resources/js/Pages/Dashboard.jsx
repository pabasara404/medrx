import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import UploadPrescription from './UploadPrescription';
import UserQuotations from './UserQuotations';
import PharmacyPrescriptions from './PharmacyPrescriptions';



export default function Dashboard() {
    const { auth } = usePage().props;
    const role = auth.user.role;

    return (
        <AuthenticatedLayout

        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-100 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 text-gray-900">
                        {role === 'user' && (
                            <>
                                <UploadPrescription />
                                <UserQuotations quotations={usePage().props.quotations || []} />

                            </>
                        )}

                        {role === 'pharmacy' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold">Incoming Prescriptions</h3>
                                <PharmacyPrescriptions prescriptions={usePage().props.prescriptions || []} />

                                <h3 className="text-lg font-bold mt-6">Prepare Quotation</h3>
                                {/* Display form/table to prepare quotation */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
