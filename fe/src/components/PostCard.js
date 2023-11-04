import { SendOutlined } from '@ant-design/icons';
import { Card, Tag, Button, Input, Form, DatePicker, Alert, Menu, Dropdown, DropdownProps } from 'antd';
import React, { useState } from 'react';
import { createComment, getCommentByPost } from '../services/commentAPI'
import { DownOutlined, UpOutlined} from '@ant-design/icons'
import { useSelector } from 'react-redux';


const PostCard = ({ post }) => {
  // Create a comment and change the post card to show the comment
  const { title, content, owner, tags, createdAt, commentCount } = post;
  const [comment, setComment] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [isShow, setIsShow] = useState(false);
  const currentUserId = useSelector(state => state.auth._id)
  const handleSubmitComment = (e) => {
    e.preventDefault();
    createComment(post._id, commentContent).then(res => {
      console.log(res)
      // update the post
      // push new comment to comment
      post.commentCount = post.commentCount + 1;
      setComment([...comment, res])
      post.comments.push(res)
    }
    )
  }
  const handleGetCommentByPost = (e) => {
    e.preventDefault();
    setIsShow(!isShow)
    getCommentByPost(post._id).then(res => {
      // update the post
      console.log(res)
      setComment(res)
      post.comments.push(res)
    }
    )
  }
  console.log(post)
  return (
    <Card title={`${title}`}  
    // extra={ currentUserId === post?.onwer?._id ? (
    //     {/* <Dropdown overlay={
    //       <Menu>
    //         <Menu.Item key="1">
    //           <a href="#">Delete</a>
    //         </Menu.Item>
    //       </Menu>
    //     } trigger={['click']}>
    //       <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
    //         <DownOutlined />
    //       </a>
    //     </Dropdown> */}
    //     null
    // ) :null}  
    style={{ width: 300, marginBottom: 30 }}>
      {/* // convert createdAt to date */}
      <div>
        <p>{new Date(
          createdAt
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
        )} </p>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </div>
      <p>Owner: {owner.name}</p>
      <p>{content}</p>
      <div onClick={
        handleGetCommentByPost
      }>
        <p style={{
          cursor: 'pointer'
        }}>
        {isShow ? <UpOutlined /> : <DownOutlined />} Comments: {commentCount}  
        </p>
      </div>
      {
        isShow ? (
          <>
            <div>
              {comment.map((comment, index) => (
                <>
                  <div className='d-flex'>
                    <p style={{
                      fontWeight: 'bold'
                    }}>{comment.owner.name}:</p>
                    <p key={index}>{comment.content}</p>
                  </div>
                </>
              ))}
            </div>
            <div className='
      d-flex'>

              <Input placeholder="Comment"
                onChange={
                  (e) => setCommentContent(e.target.value)

                } />
              <Button type="primary" onClick={handleSubmitComment}><SendOutlined /></Button>
            </div>
          </>) : null

      }
    </Card>
  );
};

export default PostCard;