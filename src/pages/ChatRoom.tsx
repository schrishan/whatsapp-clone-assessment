import React, { useEffect, useState, useSyncExternalStore } from "react";
import axios from 'axios';
import { SearchBar, Loader, Header, ChatBoardHeader, ChatBoard, NewChatBar, InitialState, Contact } from '../components';
import '../styles/chat-room.scss';
import { LoginType, ActiveContactType } from "../types/type";
import { useNavigate } from "react-router";

const ChatRoom = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([] as any[]);
    const [loading, setLoading] = useState(false);
    const [activeContact, setActiveContact] = useState<ActiveContactType>({ id: '', name: '', lastSeen: '', image: '' });
    const [activeChat, setactiveChat] = useState([] as any[]);
    const [error, setError] = useState('');
    const [activeId, setActiveId] = useState();

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('userLoggedIn');
        if (!userLoggedIn) {
            navigate("/login", { replace: true });
        }
        setLoading(true);
        const chatsDataFetch = async () => {

            await axios
                .get(`http://localhost:3001/contactList`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                    setLoading(false);
                }).catch(err => {
                    setError('Something went wrong. Please try again later.')
                });
        }
        chatsDataFetch();
    }, []);

    const selectContact = (id: string, name: string, lastSeen: string, image: string, chatList: any) => {
        setActiveContact((prevContact) => ({ ...prevContact, id: id, name: name, lastSeen: lastSeen, image: image }));
        setactiveChat(chatList);
        document.body.classList.add('contact-active');
    }

    return (
        <div className="main-container">
            {loading && <Loader />}
            <div className="contacts-holder">
                <Header />
                <SearchBar />
                <div className="contact-list">
                    {data.map((contactObj, index) => {
                        return (
                            <>
                                <Contact key={`id-${index}`} name={contactObj.name} summery={contactObj.summery} state={activeContact.id === `id-${index}` ? "active" : "inactive"} onClick={() => selectContact(`id-${index}`, contactObj.name, contactObj.summery.lastMessageDate, contactObj.summery.profileImg,contactObj.messages)} />
                            </>
                        )
                    })}
                </div>
            </div>
            {activeContact.id == '' ? <InitialState /> :
                <div className="chat-window">
                    <ChatBoardHeader data={activeContact} />
                    <ChatBoard messages={activeChat}/>
                    <NewChatBar />
                </div>}
        </div>
    )
}

export default ChatRoom;