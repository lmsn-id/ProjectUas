import React from "react";
import Navbar from "./Components/Navbar";
import { usePage } from "@inertiajs/react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { url } = usePage();
    const hideNavbarOn = [
        "/login",
        "/register",
        "/admin",
        "/test",
        "/forgot-password",
    ];
    const shouldHideNavbar = hideNavbarOn.some((path) => url.startsWith(path));

    return (
        <>
            {!shouldHideNavbar && <Navbar />}
            <main className="w-full h-full">{children}</main>
        </>
    );
}
