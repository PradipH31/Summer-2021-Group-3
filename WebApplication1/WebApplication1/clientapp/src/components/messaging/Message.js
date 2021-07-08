import React, { useEffect } from 'react';

const Message = (props) => {

    return (
        <div className="msg-participants" style={{ paddingBottom: '1%' }}>
            <span style={{alignContent: 'left'}}>{props.user}</span>:{props.message}
        </div >
    );
};

export default Message;