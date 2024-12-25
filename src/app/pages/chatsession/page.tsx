"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";

const page = () => {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const [otherUserName, setOtherUserName] = useState("");
    const [otherUserAvatar, setOtherUserAvatar] = useState("");

    useEffect(() => {
        if (router.query) {
            setOtherUserName(router.query.otherUserName);
            setOtherUserAvatar(router.query.otherUserAvatar);
        }
    }, [router.query]);

    const sendMessage = () => {
        if (inputValue.trim() === "") return;
        setMessages((prev) => [...prev, inputValue]);
        setInputValue("");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <header className="p-4 bg-purple-950 bg-gradient-to-t from-red-400 text-white text-lg font-bold shadow-md">
                <div className="flex justify-end">
                    <button onClick={() => router.push("/pages/chat")}>
                        <HiArrowNarrowLeft />
                    </button>
                </div>
                <div className="flex items-center py-1">
                    <img src={otherUserAvatar} alt="" className="h-10 w-10 rounded-full" />
                    <p className="px-10">Chat with <span>{otherUserName}</span></p>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message, index) => (
                    <div key={index} className={`p-3 rounded-lg ${index % 2 === 0 ? "bg-blue-500 text-white self-start" : "bg-gray-300 text-black self-end"} max-w-xs`}>
                        {message}
                    </div>
                ))}
            </div>

            <div className="sticky bottom-0 p-4 bg-white shadow-md">
                <div className="flex items-center space-x-3">
                    <input type="text" className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none text-black" placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
                    <button onClick={sendMessage} className="px-4 py-2 bg-purple-950 bg-gradient-to-t from-red-400 text-white rounded-lg hover:bg-gray-400">Send</button>
                </div>
            </div>
        </div>
    );
};

export default page;
