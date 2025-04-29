export default function DashboardHome() {
    return (
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
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                        Lazer Shope
                    </h1>
                    <p className="text-base md:text-lg mb-6 md:mb-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Necessitatibus tenetur facere minus eaque. Asperiores
                        animi exercitationem in enim inventore minima rem rerum,
                        vel qui saepe, itaque, voluptatem ipsa officia natus!
                    </p>
                </div>

                <div className="w-full md:w-1/2 flex justify-end items-center">
                    <img
                        src="image/img1.png"
                        alt="image"
                        className="w-3/4 md:w-full max-w-md"
                    />
                </div>
            </div>
        </section>
    );
}
