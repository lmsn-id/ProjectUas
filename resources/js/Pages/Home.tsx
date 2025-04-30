import { Head, usePage } from "@inertiajs/react";
import { Car, RefreshCw, Headset, Database } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
interface HomeProps {
    homeData: {
        id: string;
        title: string;
        text: string | null;
        description: string;
        image?: string;
        layout: string;
        position: string;
        urutan: number;
    }[];
}

export default function Home({ homeData }: HomeProps) {
    const filterDataByLayout = (layout: string) => {
        return homeData
            .filter((item) => item.layout === layout)
            .sort((a, b) => a.urutan - b.urutan);
    };

    const dashboardData = filterDataByLayout("Dashboard");
    const dashboardLeftData = dashboardData.filter(
        (item) => item.title || item.description
    );
    const dashboardRightData = dashboardData.filter((item) => item.image);
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <section className="w-full h-screen relative">
                <div className="absolute inset-0">
                    <img
                        src="/image/Background.jpg"
                        className="w-full h-full object-cover"
                        alt="Background"
                    />
                </div>

                <div className="relative container mx-auto h-full flex flex-col-reverse md:flex-row justify-center items-center px-5 md:px-20 py-10">
                    <div className="w-full md:w-1/2 text-center md:text-left text-gray-900 mt-10 md:mt-0">
                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            loop={true}
                            spaceBetween={50}
                            slidesPerView={1}
                            className="left-swiper"
                        >
                            {dashboardLeftData.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                                        {item.title ?? ""}
                                    </h1>
                                    <p className="text-base md:text-lg mb-6 md:mb-8">
                                        {item.description ?? ""}
                                    </p>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="w-full md:w-1/2">
                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            spaceBetween={50}
                            loop={true}
                            slidesPerView={1}
                            className="right-swiper "
                            dir="rtl"
                        >
                            {dashboardRightData.map((item) => (
                                <SwiperSlide key={item.id}>
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt="image"
                                            className="w-3/4 md:w-full max-w-md"
                                        />
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>

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
