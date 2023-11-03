import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRegisterUser } from "../../api/auth";
import SweetAlert2 from 'react-sweetalert2';
import TopBar from "../../components/TopBar";
import Footer from "../../components/Footer";

const RegisterPage = () => {
    const [dataRegister, setRegister] = useState({});
    const [Error, setError] = useState('');
    const [swalProps, setSwalProps] = useState({});
    const [swalSuccess, setSwalSuccess] = useState({});
    let navigate = useNavigate();
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
    
    const RegisterPage = async (e) => {
        e.preventDefault();
     
       
        apiRegisterUser(dataRegister)
        .then(res => {
           
            if(res.data.error){
                setSwalProps({
                    show: true,
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message
                  });
                  
              }else{
                setSwalSuccess({
                  show: true,
                  icon: 'success',
                  title: 'SUCCESS',
                  text: 'REGISTRASI BERHASIL, SILAKAN LOGIN DENGAN AKUN BARU DI BUAT INI'
                });
               
            }
              
        })
        .catch(err => {
          console.log(err.message);
        });
        
    }

    return(
        <div>

                <Container style={{marginTop: '90px', marginBottom: '42px'}}>
                    <Row className="justify-content-center fs-6">
                        <Col sm={4}>
                            <Card>
                                <Card.Header className="bg-primary"><h5 className="text-white">REGISTER PAGE</h5></Card.Header>
                                <Card.Body>
                                <SweetAlert2 {...swalProps}
                                    didClose={() => {
                                        setSwalProps({
                                            show: false,
                                        });
                                    }}
                                />

                                <SweetAlert2 {...swalSuccess}
                                    didClose={() => {
                                        setSwalSuccess({
                                            show: false,
                                        });
                                        navigate('/login');
                                    }}
                                />
                                <Form onSubmit={RegisterPage} >
                                    <p>Already have a account ! <Link to="/login">Login</Link></p>
                                    <Form.Group className="mb-3 text-start text-primary fw-bold" controlId="full_name">
                                        <Form.Label className="ms-1">Full Name</Form.Label>
                                        <Form.Control size="sm" type="text" name="full_name" placeholder="Masukan Nama Lengkap" 
                                            onChange={(e) => { setRegister({...dataRegister, full_name: e.target.value}) }}  />
                                    </Form.Group>
                                    <Form.Group className="mb-3 text-start text-primary fw-bold" controlId="email">
                                        <Form.Label className="ms-1">Email</Form.Label>
                                        <Form.Control size="sm" type="email" name="email" placeholder="Masukan Email" autoComplete="off" 
                                            onChange={(e) => { setRegister({...dataRegister, email: e.target.value}) }} />
                                    </Form.Group>
                                    <Form.Group className="mb-1 text-start text-primary fw-bold" controlId="password">
                                        <Form.Label className="ms-1">Create Password</Form.Label>
                                        <Form.Control size="sm" type={passwordType} name="password" placeholder="Masukkan Password"
                                            onChange={(e) => { setRegister({...dataRegister, password: e.target.value , role: 'user'}) }} />
                                        <span className="btn btn-sm btn-outline" onClick={togglePassword}>
                                        { passwordType==="password"?  <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} /> }
                                        </span>
                                    </Form.Group>
                                    <div className="ms-1 text-start">
                                    <Button variant="primary" type="submit" className="mb-3">
                                        Register
                                    </Button>
                                    
                                    </div>
                                    
                                </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
        </div>
    )
}

export default RegisterPage;