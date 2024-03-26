
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
import { MdModeEditOutline } from "react-icons/md";
import { FaEllipsis } from "react-icons/fa6";

const socket = io("https://capychat-server-production.up.railway.app");

export default function Messages(props) {

    const [isMenuSticky, setIsMenuSticky] = useState(false);
    const [leaveChatMode, setLeaveChatMode] = useState(false)
    const [menuMode, setMenuMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [chatTitle, setChatTitle] = useState(props.currentChat.title)
    const messagesEndRef = useRef(null);

    function toggleMenuMode() {
        setMenuMode(!menuMode)
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

    // useEffect(() => {
    //     async function getChat() {
    //         const res = await axios.get(`${DOMAIN}/api/chats/${props.currentChat.chat_id}`)
    //         props.setCurrentChat(res.data)
    //     }
    //     getChat();
    // }, [props.currentChat])

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

    async function handleEditChat(e) {
        e.preventDefault();
        const title = e.target.title.value;
        const chat = { title };
        const res = await axios.post(`${DOMAIN}/api/chats/${props.currentChat.chat_id}`, chat);
        if (res?.data.success) {
            const newChats = await axios.get(`${DOMAIN}/api/chats/user/${props.user.user_id}`);
            props.setChats(newChats.data);
            setEditMode(false);
            socket.emit("chat", chat);
        }
        else {
            setInputMessage("");
        }
    }

    return (
        <div className="px-5 border-2 border-slate-600 mx-auto bg-slate-800 w-[330px] md:w-[900px] h-[77vh] md:h-screen overflow-y-auto">
            <div className="flex justify-between py-5 sticky top-0 bg-slate-800">
                {!editMode && <div className="flex text-xl"><IoChatbubbleEllipsesOutline size={25} className="text-center mx-2" />{props.currentChat.title} <button onClick={() => setEditMode(true)}><MdModeEditOutline size={20} className="ml-2" /></button></div>}
                {editMode && <form onSubmit={handleEditChat}>
                    <input type="text" name="title" id="title" value={chatTitle} onChange={(e) => setChatTitle(e.target.value)} className="text-black" />
                    <button className="edit-btn cursor-pointer px-2 mr-1 bg-slate-800 rounded-xl">Edit</button>
                    <button className="delete-btn cursor-pointer px-2 mx-1 bg-red-600 rounded-xl" onClick={() => setEditMode(false)}>Cancel</button>
                </form>}
                <div>
                    <button onClick={toggleMenuMode} className="bg-slate-800 hover:bg-slate-600 transition-all ease duration-300 py-2 px-2 rounded-full"><FaEllipsis /></button>
                </div>
            </div>
            {menuMode && <div className="sticky top-16 bg-slate-900 z-[99]">
                <button onClick={() => setLeaveChatMode(true)} className="absolute right-0 flex delete-btn cursor-pointer px-2 mx-1 bg-red-900 rounded-xl hover:bg-red-600 transition-all ease duration-300 z-[99]">Leave Chat<IoExitOutline size={25} className="text-center ml-2" /></button>
            </div>}
            <div className="sticky top-16 bg-slate-800 py-5 cursor-pointer hover:bg-slate-600 transition-all ease duration-300">+ Invite friend</div>
            <div className="overflow-hidden">
                {leaveChatMode && <div className="absolute z-[99] py-12 px-2 md:px-10 bg-slate-800 border border-white top-[20%] md:left-[40%] flex flex-col">
                    <div className="py-2">Are you sure you want to leave chat?</div>
                    <div className="mx-auto py-2">
                        <button onClick={handleLeaveChat} className="hidden md:block md:pb-1 edit-btn cursor-pointer px-5 py-2 bg-slate-700 rounded-xl hover:bg-slate-600 transition-all ease duration-300">Yes</button>
                        <button onClick={() => setLeaveChatMode(false)} className="hidden md:block delete-btn cursor-pointer px-5 py-2 bg-red-800 rounded-xl hover:bg-red-600 transition-all ease duration-300">No</button>
                        <button onClick={() => setLeaveChatMode(false)} className="md:hidden delete-btn cursor-pointer px-5 py-2 bg-red-800 rounded-xl hover:bg-red-600 transition-all ease duration-300">No</button>
                        <button onClick={handleLeaveChat} className="md:hidden edit-btn cursor-pointer px-5 py-2 bg-slate-700 rounded-xl hover:bg-slate-600 transition-all ease duration-300">Yes</button>
                    </div>
                </div>}
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
                        <button type="submit" className="mx-1 px-4 md:mx-2 md:px-5 rounded-3xl bg-yellow-600 text-white"><LuSendHorizonal size={25} /></button>
                    </div>
                </form>
            </div>
        </div>
    )
}
