import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const ChatInput = (props) => {
    const [message, setMessage] = useState('');
    const classes = useStyles();

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
            {/* <input type="text" id="message"
                name="message" value={message}
                style={{ flexGrow: '5' }}
                onChange={onMessageUpdate} /> */}
            <TextField
                id="standard-basic"
                label="Send a message:"
                name="message"
                value={message}
                style={{flexGrow: '5'}}
                onChange={onMessageUpdate}
            />
            <button style={{
                backgroundColor: '#1976d2',
                color: 'white',
                flexGrow: '1'
            }}>
                <SendIcon />
            </button>
        </form >
    )
};

export default ChatInput;