import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {

    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const submit = data => {
        axios 
        .post("https://api-ecommerce-1.onrender.com/login", data)
        .then(resp => {
            localStorage.setItem("token", resp.data.token)
            navigate("/")
        })
        .catch(error => {
            console.log(error)
            if (error.response.status === 401) {
                <Navigate to={"/error"} />
            }
        })
    }

    return (
        <Form  
        onSubmit={handleSubmit(submit)}
        style={{display: "flex",
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        padding: "3rem",
        margin: "6rem 8rem"}}
        >
            <Form.Group 
            className="mb-3" 
            controlId="formBasicEmail"
            style={{width: "20rem"}}
            >
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                type="email"
                placeholder="Enter email"
                {...register("email")}
                />
                <Form.Text className="text-muted">
                Take care of your information
                </Form.Text>
            </Form.Group>
            <Form.Group 
            className="mb-3" 
            controlId="formBasicPassword"
            style={{width: "20rem"}}
            >
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Password" 
                {...register("password")}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
            Start
            </Button>
        </Form>
    )
}

export default Login