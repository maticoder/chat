import React from "react";

const Message = ({ message }) => {
    return (
        <div className="d-flex my-3">
            <div className="py-2 px-3 rounded-pill bg-primary">
                <p className="text-white" key={message.uuid}>
                    {message.content}
                </p>
            </div>
        </div>
    );
};

export default Message;
