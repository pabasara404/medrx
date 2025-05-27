import React from 'react';

function PharmacyApp() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center pt-32">
            {/* Sticky Header */}
            <div className="fixed top-0 z-50 w-full bg-white dark:bg-gray-100 shadow-md">
                <div className="mx-auto w-full max-w-7xl px-6">
                    <header className="grid grid-cols-2 items-center gap-2 py-6 lg:grid-cols-3">
                        <div className="flex lg:col-start-2 lg:justify-center">
                            <svg
                                className="h-12 w-auto text-blue-600 lg:h-16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4V7z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <nav className="-mx-3 flex flex-1 justify-end">
                            <a href="#home" className="rounded-md px-3 py-2 text-black hover:text-blue-600 dark:text-gray-800 dark:hover:text-blue-600">Home</a>
                            <a href="#services" className="rounded-md px-3 py-2 text-black hover:text-blue-600 dark:text-gray-800 dark:hover:text-blue-600">Services</a>
                            <a href="#contact" className="rounded-md px-3 py-2 text-black hover:text-blue-600 dark:text-gray-800 dark:hover:text-blue-600">Contact</a>
                            <a href="/login" className="rounded-md px-3 py-2 text-black hover:text-blue-600 dark:text-gray-800 dark:hover:text-blue-600">Log in</a>
                            <a href="/register" className="rounded-md px-3 py-2 text-black hover:text-blue-600 dark:text-gray-800 dark:hover:text-blue-600">Register</a>
                        </nav>
                    </header>
                </div>
            </div>

            {/* Main Content */}
            <main className="mt-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-800 sm:text-5xl">
                        Welcome to HealthCare Pharmacy
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-700">
                        Your trusted partner for all your healthcare needs. From prescriptions to consultations, we're here to help you stay healthy.
                    </p>
                    <a
                        href="#services"
                        className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                        Explore Our Services
                    </a>
                </div>

                <div className="grid gap-6 lg:grid-cols-2 lg:gap-8" id="services">
                    {/* Service Cards */}
                    {[
                        {
                            title: 'Prescription Services',
                            description: 'Fast and reliable prescription fulfillment with expert advice from our pharmacists.',
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            )
                        },
                        {
                            title: 'Health Consultations',
                            description: 'Personalized health advice and consultations with our experienced pharmacy team.',
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a2 2 0 00-2-2h-3m-2 4h-5a2 2 0 01-2-2v-2m14-6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2h2m4-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v6" />
                            )
                        },
                        {
                            title: 'Over-the-Counter Medications',
                            description: 'Wide range of OTC medications for your everyday health needs.',
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )
                        },
                        {
                            title: 'Online Ordering',
                            description: 'Conveniently order your medications online with fast delivery options.',
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            )
                        }
                    ].map((card, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-200 transition duration-300 hover:ring-blue-300 focus:outline-none focus-visible:ring-blue-600 dark:bg-gray-100 dark:ring-gray-300 dark:hover:ring-blue-400"
                        >
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-200">
                                <svg className="size-6 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {card.icon}
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-800">{card.title}</h2>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-700">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-16 text-center text-sm text-gray-600 dark:text-gray-700" id="contact">
                © 2025 HealthCare Pharmacy. Contact us at info@healthcarepharmacy.com or call (123) 456-7890.
            </footer>
        </div>
    );
}

export default PharmacyApp;
