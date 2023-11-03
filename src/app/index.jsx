import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar"

const PosStore = () => {
    return (
        <>
            <TopBar />
                <Outlet />
            <Footer />
        </>
    )
}

export default PosStore;