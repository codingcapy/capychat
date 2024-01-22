


import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'title is required'], trim: true, maxlength: [80, 'title char limit is 80'] },
    date: { type: Date, required: true, default: Date.now },
    users: [String],
    messages: [String],
    chatId: { type: Number, required: [true, 'chatId is required'] },
})

const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema)
export default Chat