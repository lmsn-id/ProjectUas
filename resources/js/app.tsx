import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import Layout from "./layout";

createInertiaApp({
    title: (title) => `${title}`,
    resolve: async (name) => {
        const pages = import.meta.glob("./Pages/**/*.tsx");
        const page = (await resolvePageComponent(
            `./Pages/${name}.tsx`,
            pages
        )) as { default: { layout?: (page: React.ReactNode) => JSX.Element } };

        if (!page.default.layout) {
            page.default.layout = (page: React.ReactNode) => (
                <Layout>{page}</Layout>
            );
        }

        return page;
    },
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
        } else {
            createRoot(el).render(<App {...props} />);
        }
    },
    progress: {
        color: "#4B5563",
    },
});
