import { useEffect } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { apiGetInvoiceByOrderId } from "../../api/order";
import { useState } from "react";
import {  rupiahFormat } from "../../capitalize";
import { format } from 'date-fns'
// import * as moment from 'moment';

const InvoicePage = () => {
    const [dataInvoice, setDataInvoice] = useState({});
    const [dataOrder, setDataOrder] = useState({})
    const [dataUser, setDataUser] = useState({});
    const [dataAddress, setAddress] = useState({});
    const params = useParams();
    useEffect(() => {  
           apiGetInvoiceByOrderId(params.id)
        .then(res => {
            setDataInvoice(res.data)
            setDataOrder(res.data.order);
            setDataUser(res.data.user);
            setAddress(res.data.delivery_address)
        })
        .catch(err => {
        console.log(err.message);
        });
    },[]);

    return(
        <Container style={{marginBottom: '100px', marginTop: '90px', minHeight: '375px' }}>
            <Card >
                <Card.Header className="text-start text-white bg-primary"><h6>Invoice</h6></Card.Header>
                <Card.Body className="pe-4">
                        <Row>
                        <Col xs={12}>
                            <Table className="table table-responsive" hover responsive style={{ fontSize: '88%' }} >
                                <tbody>
                                    <tr>
                                        <td className="text-start" width={'15%'}>No Invoice</td>
                                        <td className="text-start" width={'1%'}> : </td>
                                        <td className="text-start"> {dataOrder.order_number} </td>  
                                    </tr>
                                    <tr>
                                        <td className="text-start" width={'15%'}>Tgl Pembelian</td>
                                        <td className="text-start" width={'1%'}> : </td>
                                        <td className="text-start"> {dataOrder.createdAt} </td>  
                                    </tr>
                                    <tr>
                                        <td className="text-start" width={'15%'}>Status Pesanan</td>
                                        <td className="text-start" width={'1%'}> : </td>
                                        <td className="text-start"> {dataOrder.status} </td>  
                                    </tr>
                                    <tr>
                                        <td className="text-start" width={'15%'}>Sub Total Pembelian</td>
                                        <td className="text-start" width={'1%'}> : </td>
                                        <td className="text-start"> {rupiahFormat(dataInvoice.sub_total)} </td>  
                                    </tr>
                                    <tr>
                                        <td className="text-start" width={'15%'}>Delivery Fee</td>
                                        <td className="text-start" width={'1%'}> : </td>
                                        <td className="text-start"> {rupiahFormat(dataInvoice.delivery_fee)} </td>  
                                    </tr>
                                    <tr>
                                        <td className="text-start" width={'15%'}>Total</td>
                                        <td className="text-start" width={'1%'}> : </td>
                                        <td className="text-start"> {rupiahFormat(dataInvoice.sub_total+dataInvoice.delivery_fee)} </td>  
                                    </tr>
                                    <tr>
                                        <td className="text-start align-middle" width={'15%'}>Billed To</td>
                                        <td className="text-start align-middle" width={'1%'}> : </td>
                                        <td className="text-start"> 
                                            <span className="fw-bold"> {dataUser.full_name} </span>
                                            <br />
                                            {dataUser.email}
                                            <br/>
                                            {dataAddress.detail}, {dataAddress.kelurahan}, {dataAddress.kecamatan}, {dataAddress.kabupaten}, {dataAddress.provinsi}
                                        </td>  
                                    </tr>
                                    <tr>
                                        <td className="text-start align-middle" width={'15%'}>Payment To</td>
                                        <td className="text-start align-middle" width={'1%'}> : </td>
                                        <td className="text-start"> 
                                            Andri Suryono
                                            <br />
                                            andri.suryono@gmail.com
                                            <br/>
                                            BCA 03xxxxxx Andri Suryono
                                        </td>  
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default InvoicePage;