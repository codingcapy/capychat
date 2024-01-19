"use client";

import Logout from "@/components/Logout";
import Friends from "@/components/Friends";
import Chats from "@/components/Chats";
import Messages from "@/components/Messages";
import ChatsM from "@/components/ChatsM";
import FriendsM from "@/components/FriendsM";
import MessagesM from "@/components/MessagesM";
import { useState, useEffect } from "react";

export default function DashboardContent(props) {
    const [chatsMode, setChatsMode] = useState(true);
    const [messagesMode, setMessagesMode] = useState(false);
    const [friendsMode, setFriendsMode] = useState(false);
    const [isMenuSticky, setIsMenuSticky] = useState(false);

    function tappedChats() {
        setChatsMode(true);
        setMessagesMode(false);
        setFriendsMode(false);
    }

    function tappedMessages() {
        setChatsMode(false);
        setMessagesMode(true);
        setFriendsMode(false);
    }

    function tappedFriends() {
        setChatsMode(false);
        setMessagesMode(false);
        setFriendsMode(true);
    }

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
        <div className="flex flex-col min-h-screen">
            <main main className="flex-1">
                <div className="hidden md:flex">
                    <div className="flex">
                        <Friends />
                        <Chats />
                        <Messages />
                        <div className="py-5 ">
                            <div className="px-5">{props.username}</div>
                            <Logout />
                        </div>
                    </div>
                </div>
                <div className="px-3">
                {chatsMode && <ChatsM />}
                {friendsMode && <FriendsM />}
                {messagesMode && <MessagesM />}
                </div>
            </main>
            <div
                className={`flex py-5 md:hidden sticky z-10 bg-white ${isMenuSticky ? "top-0" : "bottom-0"
                    }`}
            >
                <div className="px-2" onClick={() => tappedFriends()}>
                    Friends
                </div>
                <div className="px-2" onClick={tappedChats}>
                    Chats
                </div>
                <div className="px-1" onClick={tappedMessages}>
                    Messages
                </div>
                <div>{props.username}</div>
                <Logout />
            </div>
        </div>
    );
}
