import { Button, Container, Form, InputGroup, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import "./index.css";
import { faSearch, faCartShopping,faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { apiGetCategory } from '../../api/category';
import { useState } from 'react';
import { capitalizeFirst } from '../../capitalize';
import { actSetCategory, actSetSearch } from '../../features/Product/actions';
import { apiGetCart } from '../../api/cart';
import { actRefreshItem } from '../../features/Cart/actions';

const TopBar = () => { 
    let auth = useSelector(state => state.auth);
    let product = useSelector(state => state.product);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [totalCart, setTotalCart] = useState(0);

    //batas awal tampil data category utk select category
    const [dataCategory, setCategory] = useState([]);
    useEffect(() => { 
     
            if(auth.token){
                const fetchCart = () => { 
                    apiGetCart()
                    .then(res => {
                            let cartData = res.data.map((data) => (
                                {_id: data.product._id,
                                product: { _id: data.product._id},
                                qty: data.qty
                            }
                            ))
                            localStorage.setItem('cart', JSON.stringify(cartData));
                            dispatch(actRefreshItem(cartData))
                    })
                    .catch(err => {
                    console.log(err.message);
                    });
            }
            fetchCart();
        }
        
    },[auth]);
    
    //tampil data list category 
    useEffect(() => {  
        apiGetCategory()
        .then(res => {
            setCategory(res.data);
        })
        .catch(err => {
        console.log(err.message);
        });
    },[]);


    const handleCategory = (category) => {
        dispatch(actSetCategory(category));
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const textSearch = document.getElementById("search").value;
        dispatch(actSetSearch(textSearch));

    }

    useEffect(() => {  
        setTotalCart(cart.reduce((qtyBefore, qtyCurrent) => {
            return qtyBefore + qtyCurrent.qty;
        }, 0))
    },[cart]);


//batas akhir tampil data category utk select category
    return(
        <Navbar bg="primary" className='mb-4 fixed-top pt-2 pb-2' >
            <Container >
                <Navbar.Brand className="text-white"><Link to="/" className='text-white text-decoration-none d-none d-md-block'>SEJAM CAFE</Link></Navbar.Brand>
                <Nav className="me-3" style={{ width: '60px' }} >
                    <NavDropdown title={product.category ? capitalizeFirst(product.category) : 'Kategori'} >
                            <NavDropdown.Item onClick={(e) => handleCategory('')}>Semua Kategory</NavDropdown.Item>
                        {dataCategory.map((data, i) => (
                            <NavDropdown.Item key={i} onClick={(e) => handleCategory(data.name)}>{capitalizeFirst(data.name)}</NavDropdown.Item>
                        ))}
                    </NavDropdown>
                </Nav>
                <Nav className="me-auto mx-4" style={{ width: "790px" }}  >
                <Form onSubmit={handleSearch} style={{ width: '100%' }} >    
                    <InputGroup  >
                        <Form.Control type="text"  placeholder="Cari Makanan" style={{ maxWidth: '100%' }} name="search" id="search" />
                        <Button style={{ border: '2px solid white' }}  onSubmit={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} className='text-white'/>
                    </Button>
                    </InputGroup>
                </Form>
                </Nav>
                <Nav  >
                    <Link to="/cart" className="btn btn-primary position-relative">
                      <FontAwesomeIcon icon={faCartShopping} className='text-white ' />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {totalCart}
                        </span>
                    </Link>
                </Nav>   
                <Nav className="ms-1"  >
                    { auth.token ?
                    <Link to="/account" className="btn btn-primary">  
                    <FontAwesomeIcon icon={faUser} className='text-whited-flex'/>
                    </Link> :
                    <Link to="/login" className="btn btn-primary">  
                    <FontAwesomeIcon icon={faUser} className='text-white d-flex'/>
                    </Link>                 
                    }
                </Nav>   


            </Container>
      </Navbar>

    )
}

export default TopBar;