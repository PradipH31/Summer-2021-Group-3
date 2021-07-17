import React, { useEffect } from 'react';

const Message = (props) => {

    return (
        <div
            className="msg-participants"
            style={{
                paddingBottom: '1%'
            }}
        >
            <div
                style={{
                    flexGrow: '2'
                }}
            >

            </div>
            <div
                style={{
                    backgroundColor: '#F8B77F',
                    color: 'white',
                }}
            >
                <div
                    style={{
                        textTransform: 'capitalize',
                        textAlign: 'left',
                        color: 'black'
                    }}
                >
                    {props.user}
                </div>
                <div
                    style={{
                        paddingLeft: '1em',
                        backgroundColor: !props.user ? 'black' : 'inherit'
                    }}
                >
                    {props.message}
                </div>
            </div>
        </div >
    );
};

export default Message;