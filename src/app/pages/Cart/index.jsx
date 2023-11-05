import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Container, Image, Row, Table } from "react-bootstrap";
import { apiDeleteCart, apiGetCart, apiSaveCart } from "../../api/cart";
import { useDispatch, useSelector } from "react-redux";
import { actAddItem, actClearItem, actDecItem } from "../../features/Cart/actions";
import { faBookmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { rupiahFormat } from "../../capitalize";
import { useNavigate } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";
import { actChecklistItem } from "../../features/Checkout/actions";
import * as config from '../../config';

 const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //batas awal tampil data
    const [dataCart, setDataCart] = useState([]);
    const cart = useSelector(state => state.cart);
    const [mount, setMount] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [subTotal, setSubTotal] = useState(0);
    const [swalProps, setSwalProps] = useState({});
    const [swalSuccess, setSwalSuccess] = useState({});
    const [swalConfirm, setSwalConfirm] = useState({});
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [idProduct, setIdProduct] = useState([]);
   
    

    useEffect(() => {  
        apiGetCart()
        .then(res => {
            setDataCart(res.data);  
        })
        .catch(err => {
            console.log(err.message);
        });
    },[refresh]);

    useEffect(() => {  
        if(idProduct.length !== 0){
            const dataCartFilter = dataCart.filter((arrayEl) =>
            idProduct.some((filterEl) => filterEl === arrayEl.product._id)
          );
            setSubTotal(dataCartFilter.reduce((qtyBefore, qtyCurrent) => {
                return qtyBefore + (qtyCurrent.qty * qtyCurrent.price);
            }, 0))     
        }else{
            setSubTotal(0)
        }
    }, [dataCart, idProduct])

    const AddToCart = (data) => {
        dispatch(actAddItem({_id: data}))
        setMount(true)
    }

    useEffect(() => {
        if(mount){
            localStorage.setItem('cart', JSON.stringify(cart));
            apiSaveCart(cart)
            .then(() => {
              setRefresh(!refresh)
            })
            .catch(err => {
            console.log(err.message);
        });
        }  
    }, [mount, cart])

    const DecItemCart = (data) => {
        dispatch(actDecItem({_id: data}))
        setMount(true)
    }

    const handleCheckout = () => {
        dispatch(actChecklistItem(idProduct));
        navigate('/checkout');
    }


    const handleTrash = () => {
        setSwalConfirm({
            show: true,
            title: 'Apa anda yakin?',
            text: "data yang di reset tidak bisa di balikkan lagi, harus menambahkan dari awal lagi !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',                    
            preConfirm: (iya) => {
                if(iya){
                    apiDeleteCart()
                    .then(res => {
                        if(res.data.deletedCount === 0){
                            setSwalProps({
                                show: true,
                                icon: 'error',
                                title: 'Oops...',
                                text: "Data Cart Masih Kosong",
                            });
                        }else{
                            setSwalSuccess({
                                show: true,
                                icon: 'success',
                                title: 'SUCCESS',
                                text: 'Cart Berhasil direset'
                            }); 
                        }
                    }).catch(err => {
                        console.log(err.message);
                    });
                }
            }
        })
    }

    const handleChangeCheckbox = (e) => {
        const { value, checked } = e.target;
        setIdProduct([...idProduct, value]);
        if (!checked) {
          setIdProduct(idProduct.filter(item => item !== value));
        }

    };

    const handleSelectAll = e => {
  
        setIsCheckAll(!isCheckAll);
        setIdProduct(dataCart.map(li => li.product._id));
        if (isCheckAll) {
            setIdProduct([]);
        }
      };
      
  
    return (
        <Container style={{marginBottom: '100px', marginTop: '90px', minHeight: '375px' }}>
            <Card >
                <Card.Header className="text-start text-white bg-primary"><h6>Keranjang Belanja</h6></Card.Header>
                <Card.Body className="pe-4">
                  
                {/* <Card.Title className="text-start">Sub Total :</Card.Title> */}
                   
                        <Col xs={12}>
                         <Table className="table table-responsive" hover responsive style={{ fontSize: '88%' }} >
                            <thead>
                                <tr>
                                <th>
                                <input
                                    type="checkbox"
                                    name="selectAll"
                                    id="selectAll"
                                    onClick={handleSelectAll}
                                    checked={isCheckAll}
                                    readOnly
                                />
                                </th>
                                <th>Gambar</th>
                                <th>Nama Product</th>
                                <th>Harga</th>
                                <th >QTY</th>
                                <th className="text-center ps-4">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {dataCart.map((data, i) => (
                               <tr key={i}>
                                    <td><input type="checkbox" name="product" value={data.product._id} id={data.product._id} checked={idProduct.includes(data.product._id)} onClick={handleChangeCheckbox} readOnly/></td>
                                    <td><Image src={`${config.urlAPI}/public/images/products/${data.image_url}`} width={80} height={70} rounded /></td>
                                    <td className="align-middle">{data.name}</td>
                                    <td className="align-middle ">{rupiahFormat(data.price)}</td>
                                    <td className="align-middle">
                                        <Button className="btn-primary btn-sm" onClick={(e) => DecItemCart(data.product._id)}> - </Button>
                                            {' '} <div className="d-inline-block btn"> {data.qty} </div> {' '}
                                        <Button className="btn-primary btn-sm" onClick={(e) => AddToCart (data.product._id) }> + </Button>
                                     </td>
                                     <td className="align-middle text-end pe-4">{rupiahFormat(data.price*data.qty)}</td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={5} className="fw-bold text-end ">Sub Total : </td>
                                    <td className="fw-bold text-end pe-4">
                                        {rupiahFormat(subTotal)}
                                    </td> 
                                </tr>
                            </tfoot>
                        </Table>
                        </Col>
                </Card.Body>
                <Card.Footer className="text-white"> 
                    <Row>
                        <Col className="text-start">
                            <Button className="btn-sm btn-danger" disabled={dataCart.length===0 ? true : false} onClick={handleTrash} > <FontAwesomeIcon  icon={faTrashCan} /> Reset Cart</Button>
                        </Col>
                        <Col className="text-end">
                            <Button className="btn-sm" disabled={idProduct.length===0 ? true : false } onClick={handleCheckout} > <FontAwesomeIcon  icon={faBookmark} /> Checkout</Button>
                        </Col>
                    </Row>
                </Card.Footer> 
            </Card>

            {/* batas awal Handle sweet alert */}            
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
                        setDataCart([]);
                        setSubTotal(0);
                        dispatch(actClearItem());
                        localStorage.removeItem('cart');
                      
                    }}
                />

                <SweetAlert2 {...swalConfirm}
                    didClose={() => {
                        setSwalConfirm({
                            show: false,
                        });
                    }}
                    onConfirm={() => {
                        setSwalConfirm({
                            show: false,
                        });

                    }}
                />
{/* batas akhir Handle sweet alert */}

        </Container>
        
    )
 }

 export default CartPage;