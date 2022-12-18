import React from "react";
import '../styles/chat-board.scss';
import { Message } from "../components";

interface Props {
    messages: any;
}

const ChatBoard = (props: Props) => {

    return (
        <div className="chat-board-wrapper">
            {props.messages.map((message: any, index: any) => {
                return (
                    <>
                        <div key={`dateId-${index}`} className="chart-date-wrapper"><span className="chart-date">{message.date}</span></div>
                        {
                            message.chatList.map((chatObj: any, index: any) =>
                                <Message key={`msg-${index}`} message={chatObj.message} time={chatObj.time} massageType={chatObj.messageType} viewed={chatObj.viewed} />
                            )}
                    </>
                )
            })
            }
        </div>
    )
}

export default ChatBoard;
