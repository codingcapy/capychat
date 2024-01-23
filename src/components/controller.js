

"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { auth } from '@/auth'
import User from "@/models/User";
import Chat from "@/models/Chat"

const saltRounds = 10;

export async function createUser(formData) {
    const users = await User.find({})
    const userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1
    const username = formData.get("username")
    const password = formData.get("password")
    if (users.find((user) => user.username === username.toString())) {
        return
    }
    else {
        const encrypted = await bcrypt.hash(password, saltRounds)
        const user = await User.create({ username: username, password: encrypted, userId: userId })
        redirect("/api/auth/signin")
    }
}

export async function validateSession() {
    const session = await auth();
    !session && redirect("/")
    return session
}

export async function addFriend(formData) {
    const inputUser = formData.get('currentuser')
    //console.log(inputUser)
    const user = await User.findOne({ username: inputUser })
    //console.log(user)
    const inputFriend = formData.get('frienduser')
    //console.log(inputFriend)
    const friend = await User.findOne({ username: inputFriend })
    //console.log((friend))
    if (!friend) return
    if (friend.username in user.friends) return
    await User.updateOne({ username: inputUser }, { $push: { friends: friend.username } })
}

export async function createChat(formData){
    const title = formData.get('title') 
    const user = formData.get('user')
    const friend = formData.get('friend')
    const chat = await Chat.create({title})
    await Chat.updateOne({title:title}, { $push: { users: user } })
    await Chat.updateOne({title:title}, { $push: { users: friend } })
}

export async function addFriendToChat(formData) {
    const chatId = formData.get('chatid')
    const friend = formData.get('friend')
    await Chat.updateOne({chatId:chatId}, {$push: { users: friend }})
}

export async function blockUser(formData){
    const inputUser = formData.get('currentuser')
    const user = await User.findOne({ username: inputUser })
    const inputFriend = formData.get('frienduser')
    await User.updateOne({ username: inputUser }, { $pull: { friends: inputFriend } })
    await User.updateOne({ username: inputUser }, { $push: { blocked: inputFriend } })
}