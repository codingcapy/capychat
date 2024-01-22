

export default function FriendProfile(props) {

    return (
        <div className="px-5 border-2 min-w-full h-screen overflow-y-auto">
            <p className="py-10">{props.friendName}</p>
            <form>
                <button >Start Chat</button>
            </form>
        </div>
    )
}