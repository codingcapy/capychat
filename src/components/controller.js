

"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { auth } from '@/auth'
import User from "@/models/User";

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
    console.log(inputUser)
    const user = await User.findOne({ username: inputUser })
    console.log(user)
    const inputFriend = formData.get('frienduser')
    console.log(inputFriend)
    const friend = await User.findOne({ username: inputFriend })
    console.log((friend))
    if (!friend) return
    if (friend.username in user.friends) return
    await User.updateOne({ username: inputUser }, { $push: { friends: friend.username } })
}