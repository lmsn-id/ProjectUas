import { Head, usePage } from "@inertiajs/react";
import { Car, RefreshCw, Headset, Database } from "lucide-react";
import DashboardHome from "@/Container/Home/Dashboard";
export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <DashboardHome />

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                            <div className="bg-white shadow-md rounded-lg p-6 text-center">
                                <div className="mb-4">
                                    <div className="w-full flex justify-center">
                                        <Car size={40} className="" />
                                    </div>
                                </div>
                                <h6 className="text-lg font-semibold mb-2">
                                    Free Delivery
                                </h6>
                                <p className="text-gray-600">
                                    Free Shipping on all order
                                </p>
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                            <div className="bg-white shadow-md rounded-lg p-6 text-center">
                                <div className="mb-4">
                                    <div className="w-full flex justify-center">
                                        <RefreshCw size={40} className="" />
                                    </div>
                                </div>
                                <h6 className="text-lg font-semibold mb-2">
                                    Return Policy
                                </h6>
                                <p className="text-gray-600">
                                    Free Shipping on all order
                                </p>
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                            <div className="bg-white shadow-md rounded-lg p-6 text-center">
                                <div className="mb-4">
                                    <div className="w-full flex justify-center">
                                        <Headset size={40} className="" />
                                    </div>
                                </div>
                                <h6 className="text-lg font-semibold mb-2">
                                    24/7 Support
                                </h6>
                                <p className="text-gray-600">
                                    Free Shipping on all order
                                </p>
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                            <div className="bg-white shadow-md rounded-lg p-6 text-center">
                                <div className="mb-4">
                                    <div className="w-full flex justify-center">
                                        <Database size={40} className="" />
                                    </div>
                                </div>
                                <h6 className="text-lg font-semibold mb-2">
                                    Secure Payment
                                </h6>
                                <p className="text-gray-600">
                                    Free Shipping on all order
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
