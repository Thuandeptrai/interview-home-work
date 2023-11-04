// normal home page
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostAPI } from '../services/postAPI'
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Button, Modal,

} from 'antd';
import PostCard from '../components/PostCard';
import CreatePostModel from '../components/CreatePostModel';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from '../components/Header';
export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [pageIdx, setPageIdx] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getPostAPI(pageIdx, pageSize).then(res => {
      // add Comment element to post
      res.posts.forEach(post => {
        post.comments = []
      })
      setPosts(res.posts)
      setTotalPosts(res.count)

    })
  }, [])
  const handleLoadMore = () => {
    getPostAPI(pageIdx + 1, pageSize).then(res => {
      // add Comment element to post
      res.posts.forEach(post => {
        post.comments = []
      })
      setPosts([...posts, ...res.posts])
      setTotalPosts(res.count)
      setPageIdx(pageIdx + 1)
    })
  }
  return (
    <>
      <Banner />
      <Button type="primary" onClick={showModal}>
        Create Post
      </Button>
      <CreatePostModel isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
      {/* apply  InfiniteScroll make it center */}
      <div id="scrollableDiv" style={{ height: "850px", overflowY: "scroll" }

      } className="d-flex justify-content-center"
      >
        <InfiniteScroll
          dataLength={posts.length}
          next={handleLoadMore}
          hasMore={posts.length < totalPosts}
          loader={<h4>Loading...</h4>}
          // with screen 
          style={{
            overflow: "visible",
          }}
          scrollableTarget="scrollableDiv"

          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </InfiniteScroll>
      </div>


    </>
  )
}