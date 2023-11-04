// login Page
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AUTH_ACTIONS } from '../redux/action'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// Redux

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(state => state.auth.loading)
    const error = useSelector(state => state.auth.error)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = () => {
        // async dispatch
        dispatch({ type: AUTH_ACTIONS.LOGIN, username: userName, password: password })

        // push to home page
        // reload
    }
    const onFinish = (values) => {

        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (

        <>
            <div className='
        d-flex justify-content-center
        align-items-center
        ' 
        style={
            {marginTop: '100px'}
        }
        >
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
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleLogin}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        onChange={(e) => setUserName(e.target.value)}

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        {error && <Alert message={error} type="error" showIcon />}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        Click here to <a href="/register">Register</a>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}

                    >
                        {/* // Button full */}
                        {loading ? <Button type="primary" htmlType="submit" loading></Button> : <Button type="primary" htmlType="submit"
                        > Submit </Button>}
                    </Form.Item>
                    {/* Error Message */}

                </Form>
            </div>
        </>

    )
}
export default LoginPage