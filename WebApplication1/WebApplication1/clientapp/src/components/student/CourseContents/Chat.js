import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from '../../messaging/ChatWindow';
import ChatInput from '../../messaging/ChatInput';

const Chat = (props) => {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);
    let [grp, setGrp] = useState(props.className);

    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44377/hubs/chat')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.send('AddToGroup', sessionStorage.getItem('firstName') , grp);


                    connection.on('ReceiveGroupMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);

                        setChat(updatedChat);
                    });

                    connection.on('Send', message => {
                        console.log(message);
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);

                        setChat(updatedChat);
                    })
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };

        if (connection.connectionStarted) {
            try {
                await connection.send('SendGroupMessage', chatMessage, grp);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    return (
        <div>
            <ChatWindow chat={chat} />
            <ChatInput sendMessage={sendMessage} />
        </div>
    );
};

export default Chat;