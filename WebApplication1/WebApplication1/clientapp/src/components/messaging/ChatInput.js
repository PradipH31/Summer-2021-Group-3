import React, { useState } from 'react';

const ChatInput = (props) => {
    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const isMessageProvided = message && message !== '';

        if (isMessageProvided) {
            props.sendMessage(sessionStorage.getItem('firstName'), message);
            setMessage('');
        }
        else {
            alert('Please insert an user and a message.');
        }
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    return (
        <form
            onSubmit={onSubmit} style={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'space-between'
            }}>
            <label htmlFor="message" style={{ flexGrow: '1' }}>
                Send Message:
            </label>
            <input type="text" id="message"
                name="message" value={message}
                style={{ flexGrow: '5' }}
                onChange={onMessageUpdate} />
            <button style={{
                backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                flexGrow: '1'
            }}>
                Send
            </button>
        </form >
    )
};

export default ChatInput;