import React from "react";
import cl from '../Comment/Comment.module.css'

const Comment = ({comment}) => {
    return (
        <div key={comment.id} className={cl.comment__style}>
            <h5>{comment.email}</h5>
            <div>{comment.body}</div>
        </div>
    )
};

export default Comment;