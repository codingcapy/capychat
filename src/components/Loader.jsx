
import { BiLoaderCircle } from "react-icons/bi";

import Footer from "./Footer";
import Header from "./Header";

export default function Loader() {
    return (
        <div className="flex flex-col fixed min-h-full min-w-full">
            <Header />
            <main className="flex-1 mx-auto ">
                <div className="py-10">
                <BiLoaderCircle size={100} className="my-2 text-slate-600" />
                <div>Loading...</div>
                </div>
            </main>
            <Footer />
        </div>
    )
}