
/*
author: Paul Kim
date: February 8, 2024
version: 1.0
description: messages component for CapyChat client
 */

import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import io from "socket.io-client";
import { IoExitOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuSendHorizonal } from "react-icons/lu";
import MessageFriend from "./MessageFriend";

const socket = io("https://capychat-server-production.up.railway.app");

export default function Messages(props) {

    const [isMenuSticky, setIsMenuSticky] = useState(false);
    const messagesEndRef = useRef(null);

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

    async function handleLeaveChat() {
        const content = `${props.user.username} left the chat`;
        const currentUser = "notification";
        const message = { content, user: currentUser, chatId: props.currentChat.chat_id };
        await axios.post(`${DOMAIN}/api/messages`, message);
        socket.emit("message", message);
        const userId = props.user.user_id;
        const chatId = props.currentChat.chat_id;
        const res = await axios.post(`${DOMAIN}/api/chats/chat/${props.currentChat.chatId}`, { userId, chatId })
        if (res.data.success) {
            props.clickedLeaveChat();
            const response = await axios.get(`${DOMAIN}/api/chats/user/${props.user.user_id}`)
            props.setChats(response.data);
        }
    }

    return (
        <div className="px-5 border-2 mx-auto border-slate-600 bg-slate-800  w-[330px] md:w-[900px] h-[89vh] md:h-screen overflow-y-auto">
            <div className="flex justify-between py-5 sticky top-0 bg-slate-800">
                <div className="flex text-xl"><IoChatbubbleEllipsesOutline size={25} className="text-center mx-2"/>{props.currentChat.title}</div>
                <button onClick={handleLeaveChat} className="flex delete-btn cursor-pointer px-2 py-1 mx-1 bg-red-900 rounded-xl hover:bg-red-600 transition-all ease duration-300">Leave Chat<IoExitOutline size={25} className="text-center mx-2" /></button>
            </div>
            <div className="sticky top-16 bg-slate-800 py-5 cursor-pointer hover:bg-slate-600 transition-all ease duration-300">+ Invite friend</div>
            <div className="overflow-hidden">
                {props.currentMessages.map((message) =>
                    props.user.username === message.username
                        ? <Message key={message.message_id} currentMessages={props.currentMessages} currentChat={props.currentChat} message={message} setCurrentMessages={props.setCurrentMessages} />
                        : <MessageFriend key={message.message_id} currentMessages={props.currentMessages} currentChat={props.currentChat} message={message} setCurrentMessages={props.setCurrentMessages} user={props.user} />)}
                <div ref={messagesEndRef} />
            </div>
            <div className={`py-2 md:py-10 bg-slate-800 sticky z-20 ${isMenuSticky ? "top-0" : "bottom-0"}`}>
                <form onSubmit={props.handleCreateMessage}>
                    <div className="flex">
                        <input type="text" id="content" name="content" placeholder="write a message" value={props.inputMessage} onChange={(e) => props.setInputMessage(e.target.value)} required className="py-2 px-2 my-2 rounded-xl md:w-[800px] text-black" />
                        <button type="submit" className="mx-1 px-4 md:mx-2 md:px-5 rounded-3xl bg-yellow-600 text-white"><LuSendHorizonal size={25}/></button>
                    </div>
                </form>
            </div>
        </div>
    )
}