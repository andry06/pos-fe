import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actUserLogin } from "../../features/Auth/actions";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { apiLoginUser } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert2 from 'react-sweetalert2';
import TopBar from "../../components/TopBar";
import Footer from "../../components/Footer";


const LoginPage = () => {
  const [dataLogin, setLogin] = useState({});
  let navigate = useNavigate();
  // const [Error, setError] = useState('');
  let dispatch = useDispatch();
  
  const [swalProps, setSwalProps] = useState({});

  //ini utk fitur show password
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  const submitLogin =  (e) => {
    e.preventDefault();

    apiLoginUser(dataLogin)
    .then((res) => {
      if(!res.data.error){
        dispatch(actUserLogin(res.data));
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate('/account');
      }else{
        setSwalProps({
          show: true,
          icon: 'error',
          title: 'Oops...',
          text: res.data.message,
        });
      }
    })
    .catch(err => {
      console.log(err.message);
    });
    
 }

    return (
      <div>
 
          <Container style={{marginTop: '90px', marginBottom: '120px'}}>
            <Row className="justify-content-center fs-6">
                <Col sm={4}>
                  <Card>
                    <Card.Header className="bg-primary"><h5 className="text-white">LOGIN PAGE</h5></Card.Header>
                    <Card.Body>
                    <SweetAlert2 {...swalProps}
                        didClose={() => {
                          setSwalProps({
                            show: false,
                          });
                        }}
                    />
                      <Form onSubmit={submitLogin} >
                        <Form.Group className="mb-3 text-start text-primary fw-bold" controlId="email">
                          <Form.Label className="ms-1">Email</Form.Label>
                          <Form.Control size="sm" type="email" name="email" placeholder="Masukan Email" autoComplete="on" 
                            onChange={(e) => { setLogin({...dataLogin, email: e.target.value}) }} />
                        </Form.Group>
                        <Form.Group className="mb-1 text-start text-primary fw-bold" controlId="password">
                          <Form.Label className="ms-1">Password</Form.Label>
                          <Form.Control size="sm" type={passwordType} name="password" placeholder="Masukkan Password"
                            onChange={(e) => { setLogin({...dataLogin, password: e.target.value}) }} />
                          <span className="btn btn-sm btn-outline" onClick={togglePassword}>
                        { passwordType==="password"?  <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} /> }
                        </span>
                        </Form.Group>
                        <div className="ms-1 text-start">
                          <Button variant="primary" type="submit" className="mb-3">
                            Login
                          </Button>
                          <p>Don't have an account? <Link to="/register">Create Account</Link></p>
                        </div>
                        {/* { Error && <div className="bg-danger text-white p-1 my-2 rounded-pill" > {Error} </div>  } */}
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
            </Row>
          </Container>
      </div>
    )
}

export default LoginPage;