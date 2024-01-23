
import { useState } from "react"


export default function FriendProfile(props) {

    const [expanded, setExpanded] = useState(false)

    function toggleExpanded(){
        
    }

    return (
        <div className="px-5 border-2 min-w-full h-screen overflow-y-auto">
            <p className="py-10">{props.friendName}</p>
            <button className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Start Chat</button>
            {<form className="flex flex-col">
                <label for="title">Chat Title (optional)</label>
                <input name="title" id="title" className="px-2 border rounded-lg border-slate-700 py-1"/>
                <button className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Start Chat</button>
            </form>}
        </div>
    )
}