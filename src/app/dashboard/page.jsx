

import Logout from "@/components/Logout"
import { auth } from '@/auth'
import { redirect } from "next/navigation"
import { validateSession } from "@/components/controller"
import Friends from "@/components/Friends"
import Chats from "@/components/Chats"
import Messages from "@/components/Messages"
import ChatsM from "@/components/ChatsM"
import DashboardContent from "@/components/DashboardContent"

export default async function Dashboard() {

    const session = await auth();
    console.log(session)
    !session && redirect("/")
    const session2 = await validateSession()
    console.log(session2)

    return (
            <DashboardContent username={session?.user.username}/>
    )
}