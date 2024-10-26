import React, { createContext, useState } from 'react'

export const MessageDatasContext = createContext();

function MessageDatasContextComponent({ children }) {
    const [messages, setMessages] = useState([]);
    return (
        <MessageDatasContext.Provider value={{ messages, setMessages }}>
            {children}
        </MessageDatasContext.Provider>
    )
}

export default MessageDatasContextComponent
