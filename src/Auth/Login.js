 import { Button, Divider, Form, Input, message } from 'antd'
import Title from 'antd/es/typography/Title'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'
// import { auth } from '../config/ConfigFirebase'

export default function Login() {
    // const handleLogin=()=>{
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
         
    //       const user = userCredential.user;
    //       message.success("User Logged in successfully")
    //     })
    //     .catch((err) => {
          
    //       message.error(err)
          
    //     });
    // }

  return (
<>

<div className="container">
    <div className="row">
        <div className="col mb-0 ">
            <div className="card p-3 p-md-4" style={{backgroundColor:"#00a6fb"}}>
                
            <Title className='text-center'>Login</Title>
            <Divider/>
            <Form layout="vertical">
                <Form.Item label="Email">
                    <Input name='email' placeholder='Enter Your Email'/>
                </Form.Item>
                <Form.Item label="Password">
                    <Input.Password name='passwordf' placeholder='Enter Your Password'/>
                </Form.Item>
                <Button className='w-100 bg-primary text-white' style={{border:"transparent"}} >  Login</Button>
                <p className='my-3'>Do not Have an account <Link to={"/register"} className='text-decoration-none  mx-2 fs-5'>Register</Link></p>
            </Form>
            </div>
        </div>
    </div>
</div>
</>
  )
}
