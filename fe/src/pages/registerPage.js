import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { REGISTER_ACTIONS } from '../redux/action'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, Alert, DatePicker } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'


export default function RegisterPage() {
  const disPatch = useDispatch()
  // get Error from redux store
  const error = useSelector(state => state.register.error)
  const loading = useSelector(state => state.register.loading)
  const success = useSelector(state => state.register.success)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')
  const [name, setName] = useState('')
  return (<>
    
    <div className='
        d-flex justify-content-center
        align-items-center
        flex-column
        '
      style={
        { marginTop: '100px' }
      }
    >
          <h1 style={{
            marginBottom: '20px'
          }}>
      Register Page
        </h1>
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
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },

          ]}
        >
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },

          ]}
        >
          <Input onChange={(e) => setUserName(e.target.value)} />
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
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Date of birth"
          name="dob"
          rules={[
            {
              required: true,
              message: 'Please input your date of birth!',
            },

          ]}
        >
           {/* Input date Time */}
          <DatePicker onChange={(date, dateString) => setDob(dateString)} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >

          <Button type="primary" htmlType="submit" onClick={() => {
            disPatch({ type: REGISTER_ACTIONS.REGISTER, username: userName, password: password, dob: dob, name: name })
          }}>
            Submit
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          Click here to <a href="/login">Login</a>
          </Form.Item>
      </Form> 
      {success && <Alert message={"Success"} type="success" showIcon />}

      {error && <Alert message={error} type="error" showIcon />}
    </div>

    </>
  )
}
