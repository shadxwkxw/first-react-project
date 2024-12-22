import React, { useEffect, useMemo, useRef, useState } from "react";
import PostList from "../Components/PostList";
import MyButton from "../Components/UI/button/MyButton";
import PostForm from "../Components/PostForm";
import PostFilter from "../Components/PostFilter";
import MyModal from "../Components/UI/MyModal/MyModal";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../Components/UI/Loader/loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../Components/utils/pages";
import Pagination from "../Components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../Components/UI/select/MySelect";
import Loader_2 from "../Components/UI/Loader-2/Loader-2";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()
  console.log(lastElement)

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
  })

  console.log(totalPages)

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  })
  
  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (NewPost) => {
    setPosts([...posts, NewPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">

      <div className="flex__btns">
        <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
        <MyButton onClick={() => setModal(true)}>
          Создать пост
        </MyButton>
      </div>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>

      <hr style={{margin: '15px 0'}}/>

      <PostFilter
        filter={filter}
        setFilter={setFilter}
      /> 

      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Кол-во элементов"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Показать все'},
        ]}
      />

      {postError && 
        <h1 style={{textAlign: 'center', marginBottom: 30}}>Произошла ошибка {postError}.</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Пробные посты" />
      <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
      {isPostLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader_2/></div>  
      }
      <Pagination 
        page={page} 
        changePage={changePage} 
        totalPages={totalPages}
      />

    </div>
  );
}

export default Posts;
