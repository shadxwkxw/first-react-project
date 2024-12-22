import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../Components/UI/Loader/loader";
import Comment from "../Components/UI/Comment/Comment";

const PostIdPage = () => {
    
    const params = useParams()

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    
    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
        const response = await PostService.getById(params.id)
        setPost(response.data);
    }) 

    const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
        const response = await PostService.getCommentsPostById(params.id)
        setComments(response.data);
    }) 

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div style={{margin: 20}}>
            <h1>Вы открыли страницу поста c ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div style={{marginTop: 10, marginBottom: 10, fontSize: 20}}>{post.id}. {post.title}</div>
            }
            <h1>
                Комментарии
            </h1>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm => 
                        <Comment key={comm.id} comment={comm}/>
                    )}
                </div>
            }
        </div>
    )
}

export default PostIdPage;