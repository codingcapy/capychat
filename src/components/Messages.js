
"use client"

import { useState, useEffect } from "react";

export default function Messages() {

    const [isMenuSticky, setIsMenuSticky] = useState(false);

    useEffect(() => {
        function handleScroll() {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;
            setIsMenuSticky(scrollPosition > scrollThreshold);
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="px-5 border-2 min-w-full h-screen overflow-y-auto">
            <div className="text-xl sticky top-0 bg-white py-5">Chat 1</div>
            <div className="sticky top-16 bg-white py-5">+ Invite friend</div>
            <div>
                <div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Wassup!</div>
                </div>
                <div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>WOOHOO!</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>🔥🔥🔥🔥🔥🔥🔥🔥</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Message 2</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Message 2</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Message 2</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Message 2</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Message 2</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Message 2</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Message 2</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Message 2</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Message 2</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Message 2</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Message 2</div>
                </div><div className="py-2">
                    <div className="flex"><div className="font-bold">user123</div><div className="pl-2">on 2024-01-19 12:34 PM</div></div>
                    <div>Message 2</div>
                </div>
                <div className={`py-10 bg-white sticky z-20 ${isMenuSticky ? "top-0" : "bottom-0"
                    }`}>
                    <form>
                        <div className="flex">
                        <input type="text" placeholder="write a message" required className="py-2 px-2 min-w-96" />
                        <button className=" mx-2 px-5 py-5 rounded-xl bg-yellow-600 text-white">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}