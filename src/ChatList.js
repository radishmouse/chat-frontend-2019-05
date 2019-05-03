import React from 'react';

function ChatList({messages}) {
    console.log(typeof messages);
    const messageItems = messages.map((m, i) => (
        <li key={i}>{m}</li>
    ));
    return (
        <ul>
            {messageItems}
        </ul>
    );
}

export default ChatList;