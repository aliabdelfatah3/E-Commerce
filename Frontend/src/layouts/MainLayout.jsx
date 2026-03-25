import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import BackToTop from "../components/ui/BackToTop";

function MainLayout() {
    const { pathname } = useLocation();
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main key={pathname} className="flex-1 animate-page">
                <Outlet />
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
}

export default MainLayout;
