
/*
author: Paul Kim
date: February 8, 2024
version: 1.0
description: message component for CapyTalk client
 */

import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { NavLink } from "react-router-dom";

const socket = io("http://localhost:3333");

export default function MessageFriend(props) {

    const [isMenuSticky, setIsMenuSticky] = useState(false);
    const [replyMode, setReplyMode] = useState(false);
    const [messageContent, setMessageContent] = useState(props.message.content);
    const messagesEndRef = useRef(null);

    async function handleReply(e) {
        e.preventDefault();
        const content = `"${props.message.content.value}" ${e.target.content.value}`;
        const currentUser = props.user.username;
        const message = { content, user: currentUser, chatId: props.currentChat.chat_id };
        const res = await axios.post(`${DOMAIN}/api/messages`, message);
        if (res?.data.success) {
            const newMessages = await axios.get(`${DOMAIN}/api/messages/${props.currentChat.chat_id}`);
            props.setCurrentMessages(newMessages.data);
            setReplyMode(false);
            socket.emit("message", message);
        }
        else {
            setInputMessage("");
        }
    }

    useEffect(() => {
        function handleScroll() {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;
            setIsMenuSticky(scrollPosition > scrollThreshold);
        }
        window.addEventListener("scroll", handleScroll);
        scrollToBottom();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [props.currentMessages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="py-2 message-container group hover:bg-slate-600 transition-all ease duration-300">
            <div className="flex"><div className="font-bold px-1">{props.message.username}</div><div className="pl-2">on {props.message.date}</div></div>
            <div className="md:flex justify-between px-1">
                <div>
                    <div className="overflow-wrap break-word pb-1">{props.message.content}</div>
                </div>
                {replyMode && <form onSubmit={handleReply}>
                    <input type="text" name="content" id="content" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} className="text-black" />
                    <input name="messageid" id="messageid" defaultValue={`${props.message.message_id}`} className="hidden" />
                    <button className="edit-btn cursor-pointer px-2 mr-1 bg-slate-800 rounded-xl">Reply</button>
                    <button className="delete-btn cursor-pointer px-2 mx-1 bg-red-600 rounded-xl" onClick={() => setReplyMode(false)}>Cancel</button>
                </form>}
                <div className=" edit-delete hidden group-hover:flex opacity-100 transition-opacity">
                    {!replyMode && <div className="edit-btn cursor-pointer px-2 mr-1 bg-slate-800 rounded-xl">Reply</div>}
                </div>
            </div>
        </div>
    )
}