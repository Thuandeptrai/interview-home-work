// build create post model
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Form, Input, Alert , Dropdown, Space, Col} from 'antd';

import { createPostAPI } from '../services/postAPI'
const CreatePostModel = ({ isModalOpen, handleOk, handleCancel }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const handleCreatePost = () => {
        if (title === '' || content === '') {
            setError('Title and content cannot be empty')
        }
        else {
            createPostAPI(title, content).then(res => {
                console.log(res)
                handleCancel()
            })
        }
    }
    return (
        <Modal title="Create Post" visible={isModalOpen} onOk={handleCreatePost} onCancel={handleCancel}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}

                style={{
                    maxWidth: 1500,
                    height: 500,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your title!',
                        },
                    ]}
                >
                    <Input onChange={(e) => setTitle(e.target.value)} />
                   
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your content!',
                        },
                    ]}
                >
                    {/* text area */}
                    <Input.TextArea onChange={(e) => setContent(e.target.value)} />
                </Form.Item>
                
                {error !== '' && <Alert message={error} type="error" />}
            </Form>
        </Modal>
    )
}
export default CreatePostModel