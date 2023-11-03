import { useEffect } from "react";
import { Accordion, Col, Container, Row, Table } from "react-bootstrap";
import { apiGetOrder } from "../../api/order";
import { useState } from "react";
import { rupiahFormat } from "../../capitalize";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { format } from 'date-fns'

const Pemesanan = () => {   
    const [dataOrder, SetDataOrder] = useState([]);

    //batas awal tampil data
    useEffect(() => {  
        apiGetOrder()
        .then(res => {
            SetDataOrder(res.data.data)
        })
        .catch(err => {
            console.log(err.message);
        });
    },[]);

  

    return (
        <Container>
            <Row>
                <h4 className="text-start">Daftar Pemesanan</h4>
                <Row className="mt-4 mb-3 fw-bold">
                    <Col md={2} className="text-center">Order ID</Col>
                    <Col md={3} className="text-center">Waktu</Col>
                    <Col md={3} className="text-center">Total</Col>
                    <Col md={4} className="text-center">Status</Col>
                   
                </Row>
                <Accordion>
                {dataOrder.map((order, i) => (

                    <Accordion.Item eventKey={i}  key={i} >
                    <Accordion.Header>
                    <Row style={{ width: '100%' }}>
                        <Col md={2} className="text-center">{order.order_number}</Col>
                        <Col md={3} className="text-center">{format(new Date(order.createdAt), 'dd/MM/yyyy')}</Col>
                        <Col md={3} className="text-center">{rupiahFormat(order.order_items.reduce((qtyBefore, qtyCurrent) => {
                                    return qtyBefore + (qtyCurrent.qty * qtyCurrent.price);
                                    }, 0)+order.delivery_fee)}</Col>
                        <Col md={4} className="text-center">{order.status}</Col>
                    </Row>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Table className="table table-responsive" hover responsive style={{ fontSize: '88%' }} >
                            <thead>
                                <tr>
                                    <th>Nama Product</th>
                                    <th>QTY</th>
                                    <th className="text-end">Total Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.order_items.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td className="text-end">{rupiahFormat(item.qty*item.price)}</td>
                                </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={2} className="text-end fw-bold"> Sub Total : </td>
                                    <td className="text-end fw-bold">{rupiahFormat(order.order_items.reduce((qtyBefore, qtyCurrent) => {
                                    return qtyBefore + (qtyCurrent.qty * qtyCurrent.price);
                                    }, 0))}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="text-end fw-bold"> Delivery Fee : </td>
                                    <td className="text-end fw-bold">{rupiahFormat(order.delivery_fee)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="text-end fw-bold"> Total All : </td>
                                    <td className="text-end fw-bold">{rupiahFormat(order.order_items.reduce((qtyBefore, qtyCurrent) => {
                                    return qtyBefore + (qtyCurrent.qty * qtyCurrent.price);
                                    }, 0)+order.delivery_fee)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="text-end "> 
                                    {/* <Button  className="btn btn-sm btn-success mt-1" onClick={() => handleInvoice(order._id)}>
                                        <FontAwesomeIcon icon={faFileInvoice} className='text-white'/> Invoice
                                    </Button> */}
                                    <Link to={`/invoice/${order._id}`} className="btn btn-sm btn-success mt-1">
                                        <FontAwesomeIcon icon={faFileInvoice} className='text-white'/> Invoice
                                    </Link>
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                    </Accordion.Body>
                    </Accordion.Item>
                 ))}
                  </Accordion>
            </Row>
        </Container>
    )
}

export default Pemesanan;