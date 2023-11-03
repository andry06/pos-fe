import React, { useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actUserLogout } from "../../features/Auth/actions";
import { apiLogoutUser } from "../../api/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { actClearItem } from "../../features/Cart/actions";

const PageAccount = () => {

    let dispatch = useDispatch();
    const navigate = useNavigate();
    let [selectProfile, setProfile] = useState('');
    let [selectAddress, setAddress] = useState('');
    let [selectPemesanan, setPemesanan] = useState('');
    let [selectCategory, setCategory] = useState('');
    let [selectTag, setTag] = useState('');
    let [selectProduct, setProduct] = useState('');

    const submitLogout =  () => {
         apiLogoutUser()
        .then(() => {
            localStorage.removeItem('auth');
            localStorage.removeItem('cart');
            dispatch(actUserLogout());
            dispatch(actClearItem());
            navigate('/login');
            return
        })
        .catch(err => {
          console.log(err.message);
        });  
    }

    const submitProfile = () =>{
        navigate('/account/profile');
        setProfile('active');
        setAddress('');
        setCategory('');
        setTag('');
        setProduct('');
        setPemesanan('');
    }

    const submitAddress = () =>{
        navigate('/account/address');
        setProfile('');
        setAddress('active');
        setCategory('');
        setTag('');
        setProduct('');
        setPemesanan('');
    }

    const submitPemesanan = () =>{
        navigate('/account/pemesanan');
        setProfile('');
        setAddress('');
        setCategory('');
        setTag('');
        setProduct('');
        setPemesanan('active');
    }

    const submitCategory = () =>{
        navigate('/account/category');
        setProfile('');
        setAddress('');
        setCategory('active');
        setTag('');
        setProduct('');
        setPemesanan('');
    }

    const submitTag = () =>{
        navigate('/account/tag');
        setProfile('');
        setAddress('');
        setCategory('');
        setTag('active');
        setProduct('');
        setPemesanan('');
    }

    const submitProduct = () =>{
        navigate('/account/product');
        setProfile('');
        setAddress('');
        setCategory('');
        setTag('');
        setProduct('active');
        setPemesanan('');
    }

    let auth = useSelector(state => state.auth);
    if(auth.user.role === 'user'){
        return(
            <div>
                    <Container style={{marginBottom: '100px', marginTop: '90px' }}>
                            <Card >
                                <Card.Header className="text-start text-white bg-primary"><h6>Account</h6></Card.Header>
                                <Card.Body>
                                    <Row>
                                    <Col sm={3} >
                                        <ListGroup  className="text-start h6 " >
                                            <ListGroup.Item className="list-group-item list-group-item-action" active={selectProfile} action onClick={submitProfile} > Profile</ListGroup.Item>
                                            <ListGroup.Item className="list-group-item list-group-item-action" active={selectPemesanan} action onClick={submitPemesanan}  >Pemesanan</ListGroup.Item>
                                            <ListGroup.Item className="list-group-item list-group-item-action" active={selectAddress} action onClick={submitAddress} >Alamat</ListGroup.Item>
                                            <ListGroup.Item className="list-group-item list-group-item-action" action onClick={submitLogout}>Logout</ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col sm={9}>
                                        <Card style={{ minHeight: '300px' }}>
                                            <Card.Body>
                                                <Outlet />
                                            </Card.Body>
                                        </Card>

                                    </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        
                    </Container>
                
            </div>
        )
    }else if(auth.user.role === 'admin'){
        return(
            <div>
                <Container style={{marginBottom: '100px', marginTop: '90px' }}>
                    <Card >
                        <Card.Header className="text-start text-white bg-primary"><h6>Management Store</h6></Card.Header>
                        <Card.Body>
                            <Row>
                            <Col sm={3} >
                                <ListGroup  className="text-start h6 " >
                                    <ListGroup.Item className="list-group-item list-group-item-action" active={selectProfile} action onClick={submitProfile} > Profile</ListGroup.Item>
                                    <ListGroup.Item className="list-group-item list-group-item-action" active={selectPemesanan} action onClick={submitPemesanan} >Pemesanan</ListGroup.Item>
                                    <ListGroup.Item className="list-group-item list-group-item-action" active={selectAddress} action onClick={submitAddress} >Alamat</ListGroup.Item>
                                    <ListGroup.Item className="list-group-item list-group-item-action" active={selectCategory} action onClick={submitCategory}>Kelola Kategori</ListGroup.Item>
                                    <ListGroup.Item className="list-group-item list-group-item-action" active={selectTag} action onClick={submitTag}>Kelola Tags</ListGroup.Item>
                                    <ListGroup.Item className="list-group-item list-group-item-action" active={selectProduct} action onClick={submitProduct} >Add Product</ListGroup.Item>
                                    <ListGroup.Item className="list-group-item list-group-item-action" action onClick={submitLogout}>Logout</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col sm={9} >
                                <Card style={{ minHeight: '300px' }}>
                                    <Card.Body>
                                        <Outlet />
                                    </Card.Body>
                                </Card>
                            </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default PageAccount;