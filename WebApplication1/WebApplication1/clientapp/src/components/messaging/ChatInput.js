import React, { useState } from 'react';
import SendIcon from '@material-ui/icons/Send';

const ChatInput = (props) => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    // setUser('user')

    const onSubmit = (e) => {
        e.preventDefault();

        const isUserProvided = user && user !== '';
        const isMessageProvided = message && message !== '';

        // if (isUserProvided && isMessageProvided) {
        if (isMessageProvided) {
            // props.sendMessage(user, message);
            props.sendMessage('user', message);
        }
        else {
            alert('Please insert an user and a message.');
        }
    }

    const onUserUpdate = (e) => {
        setUser(e.target.value);
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    return (
        <form
            onSubmit={onSubmit}
            style={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'space-between'
            }}
        >
            {/* <label htmlFor="user">User:</label> */}
            {/* <input
                id="user"
                name="user"
                value={user}
                onChange={onUserUpdate}
            /> */}
            <label
                htmlFor="message"
                style={{
                    flexGrow: '1'
                }}
            >User:</label>
            <input
                type="text"
                id="message"
                name="message"
                value={message}
                style={{
                    flexGrow: '5'
                }}
                onChange={onMessageUpdate} />
            <button
                style={{
                    backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    flexGrow: '1'
                }}
            >Send</button>
        </form >
    )
};

export default ChatInput;