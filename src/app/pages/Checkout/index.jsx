
import { Card, Container } from "react-bootstrap";

import { useState } from "react";
import { apiGetAddress } from "../../api/address";
import { useEffect } from "react";
import { apiGetCart, apiGetCartProduct } from "../../api/cart";
import AddressChecklist from "./AddressChecklist";
import DetailPesanan from "./DetailPesanan";
import { apiCreateOrder } from "../../api/order";
import { useDispatch, useSelector } from "react-redux";
import { actRefreshItem } from "../../features/Cart/actions";
import LastInvoice from "./LastInvoice";


const CheckoutPage = () => {
    const dispatch = useDispatch();
    const checkout = useSelector(state => state.checkout);
    const [dataSelect, setDataSelect] = useState({delivery_fee: '20000', delivery_address: '', idProduct: checkout.idProduct});
    const [dataFilterId, setDataFilterId] = useState({})
    const [dataAddress, setAddress] = useState([]);
    const [formAdrress, setFormAddress] = useState(true);
    const [formKonfirmasi, setFormKonfirmasi] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);
    const [subTotal, setSubTotal] = useState(0);
    const [dataCart, setDataCart] = useState([]);
    const [invoice, setInvoice] = useState({});
    const [formInovice, setFormInvoice] = useState(false);
    const [refreshCart, setRefreshCart] = useState(false);
     //ambil data address utk tampil table address
     console.log(dataSelect)
     useEffect(() => {  
        apiGetAddress()
        .then(res => {
            setAddress(res.data.data);
        })
        .catch(err => {
        console.log(err.message);
        });
    },[]);

    useEffect(() => {  
        apiGetCartProduct(checkout.idProduct)
        .then(res => {
            setDataCart(res.data);
            setSubTotal(res.data.reduce((qtyBefore, qtyCurrent) => {
                return qtyBefore + (qtyCurrent.qty * qtyCurrent.price);
            }, 0))               
        })
        .catch(err => {
        console.log(err.message);
        });
    },[formKonfirmasi]);

    const handleKonfirmasi = (data) => {
        setFormAddress(false)
        setFormKonfirmasi(true)
        setDisabledButton(true)
        const showEdit =  dataAddress.filter(filter => filter._id === dataSelect.delivery_address)
        setDataFilterId(showEdit[0])
   
    }

    const handleBefore = () => {
        setFormAddress(true)
        setFormKonfirmasi(false)
    }

    const handleBayar = () => {
        apiCreateOrder(dataSelect)
        .then((res) => {
            setInvoice(res.data);
            setFormKonfirmasi(false);
            setFormInvoice(true);
            setRefreshCart(true);
        })
        .catch(err => {
          console.log(err.message);
        });
    }

    useEffect(() => {
        if(refreshCart){
            apiGetCart()
            .then(res => {
                    let cartData = res.data.map((data) => (
                        {_id: data.product._id,
                        product: { _id: data.product._id},
                        qty: data.qty
                    }
                    ));
                    localStorage.setItem('cart', JSON.stringify(cartData));
                    dispatch(actRefreshItem(cartData))
            })
            .catch(err => {
            console.log(err.message);
            });
        }
    }, [refreshCart])

    return(
        <div>
              <Container style={{marginBottom: '100px', marginTop: '90px', minHeight: '375px' }}>
                <Card >
                    <Card.Header className="text-start text-white bg-primary"><h6>{formInovice ? 'Invoice' : 'Checkout' } </h6></Card.Header>
                    <Card.Body className="pe-4">
                        {formAdrress && 
                            <AddressChecklist dataAddress={dataAddress}  handleKonfirmasi={handleKonfirmasi} setDataSelect={setDataSelect}  dataSelect={dataSelect} disabledButton={disabledButton} setDisabledButton={setDisabledButton} />
                        }

                        {formKonfirmasi &&
                            <DetailPesanan dataFilterId={dataFilterId} dataCart={dataCart} subTotal={subTotal} dataSelect={dataSelect} handleBefore={handleBefore} handleBayar={handleBayar} />
                        }

                        {formInovice && 
                            <LastInvoice invoice={invoice} />
                        }
                   
                </Card.Body>
            </Card>
        </Container>
            
        </div>
    )
}

export default CheckoutPage;