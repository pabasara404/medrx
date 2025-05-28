import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UploadPrescription from './UploadPrescription';
import UserQuotations from './UserQuotations';
import PrescriptionModal from '../Components/PrescriptionModal.jsx';
import PrescriptionCard from "@/Components/PrescriptionCard.jsx";

export default function Dashboard({ prescriptions = [], quotations = [] }) {
    const { auth } = usePage().props;
    const role = auth.user.role;

    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (prescription) => {
        setSelectedPrescription(prescription);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPrescription(null);
        setIsModalOpen(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {role === 'user' && (
                        <>
                            <UploadPrescription />
                            <UserQuotations quotations={quotations} />
                        </>
                    )}

                    {role === 'pharmacy' && (
                        <div className="space-y-6">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <h2 className="text-2xl font-bold mb-4">Prescription Management</h2>

                                    {/* Prescriptions Grid */}
                                    {prescriptions.length > 0 ? (
                                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                            {prescriptions.map((prescription) => (
                                                <PrescriptionCard
                                                    key={prescription.id}
                                                    prescription={prescription}
                                                    role={role}
                                                    onView={openModal} // Changed from onOpenModal to onView
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            No prescriptions found.
                                        </div>
                                    )}

                                    {isModalOpen && selectedPrescription && (
                                        <PrescriptionModal
                                            prescription={selectedPrescription}
                                            isOpen={isModalOpen}
                                            onClose={closeModal}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <h3 className="text-lg font-medium mb-4">Prepare Quotation</h3>
                                    {/* Add Quotation Form or actions here */}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
