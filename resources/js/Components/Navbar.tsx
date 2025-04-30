import { Link } from "@inertiajs/react";
import { Search, X, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

interface NavbarItem {
    id: string;
    title: string;
    text: string | null;
    description: string;
    image: string | null;
    layout: string;
    position: string | null;
    urutan: number;
}

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Produk", href: "/produk" },
        { name: "Kontak", href: "/kontak" },
    ];
    const { props } = usePage();
    const navbarData = (props.navbarData ?? []) as NavbarItem[];
    const firstNavbar = navbarData[0] ?? {};

    return (
        <>
            <header className="w-full md:px-20 fixed top-0 md:top-10 z-50">
                <nav className="container mx-auto bg-white border-gray-200 px-2 sm:px-4 py-5 shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between mx-auto px-10">
                        <Link href="/" className="flex items-center ">
                            {firstNavbar.image && (
                                <img
                                    src={firstNavbar.image}
                                    className="h-10 mr-3 sm:h-14"
                                    alt="Logo"
                                />
                            )}
                            <div className="flex gap-1 self-center text-xl font-bold whitespace-nowrap text-gray-900 uppercase text-shadow">
                                {firstNavbar.title ?? ""}
                            </div>
                        </Link>

                        <ul className="flex items-center gap-8">
                            {menuItems.map((item, index) => (
                                <li key={index} className="hidden lg:block ">
                                    <Link
                                        href={item.href}
                                        className="rounded-lg font-semibold px-4 py-2 text-gray-900 md:bg-transparent md:p-0 md:hover:bg-transparent hover:text-orange-500 transition-colors duration-500"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Search
                                    onClick={() =>
                                        setIsSearchOpen(!isSearchOpen)
                                    }
                                    className="text-gray-900 hover:text-orange-500 transition-colors duration-500 cursor-pointer"
                                    size={18}
                                />
                            </li>
                            <li>
                                <EllipsisVertical
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="text-gray-900 block lg:hidden hover:text-orange-500 transition-colors duration-500 cursor-pointer"
                                    size={18}
                                />
                            </li>
                        </ul>
                    </div>
                </nav>

                <div
                    className={`container mx-auto bg-gray-200 overflow-hidden transition-all duration-1000 ease-in-out  ${
                        isMenuOpen
                            ? "max-h-full md:max-h-28 opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                    style={{
                        transformOrigin: "bottom center",
                    }}
                >
                    <ul className="flex flex-col py-2.5 gap-4 items-center md:flex-row md:flex-wrap md:px-14  md:gap-8">
                        {menuItems.map((item, index) => (
                            <li key={index} className="block lg:hidden">
                                <Link
                                    href={item.href}
                                    className="rounded-lg font-semibold px-4 py-2 text-gray-900 md:bg-transparent md:p-0 md:hover:bg-transparent hover:text-orange-500 transition-colors duration-500"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div
                    className={`bg-gradient-to-l container mx-auto from-[#ffba00] to-[#ff6c00] overflow-hidden transition-all duration-1000 ease-in-out ${
                        isSearchOpen
                            ? "max-h-20 opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                    style={{
                        transformOrigin: "bottom center",
                    }}
                >
                    <div className="container mx-auto px-5">
                        <form className="flex justify-between items-center px-5 py-2">
                            <input
                                type="text"
                                className="bg-transparent border-none focus:outline-none focus:ring-0 focus:border-none placeholder-white text-white w-full"
                                placeholder="Search..."
                            />
                            <button
                                type="button"
                                onClick={() => setIsSearchOpen(false)}
                            >
                                <X size={18} className="text-white ml-2" />
                            </button>
                        </form>
                    </div>
                </div>
            </header>
        </>
    );
}
