import { Col, Table } from "react-bootstrap";
import { capitalizeFirst, rupiahFormat } from "../../capitalize";
import { useSelector } from "react-redux";

const LastInvoice = ({invoice}) => {
    let auth = useSelector(state => state.auth);
    const subTotal = invoice.order_items.reduce((qtyBefore, qtyCurrent) => {
        return qtyBefore + (qtyCurrent.qty * qtyCurrent.price);
    }, 0)
    const { detail , kelurahan, kecamatan, kabupaten, provinsi } = invoice.delivery_address;

    return (
        <div>
        <Col xs={12}>
            <Table className="table table-responsive" hover responsive style={{ fontSize: '88%' }} >
                <tbody>
                    <tr>
                        <td className="text-start" width={'15%'}>Status Pesanan</td>
                        <td className="text-start" width={'1%'}> : </td>
                        <td className="text-start"> {invoice.status} </td>  
                    </tr>
                    <tr>
                        <td className="text-start" width={'15%'}>Total Amount</td>
                        <td className="text-start" width={'1%'}> : </td>
                        <td className="text-start"> {rupiahFormat(invoice.delivery_fee + subTotal)} </td>  
                    </tr>
                    <tr>
                        <td className="text-start align-middle" width={'15%'}>Billed To</td>
                        <td className="text-start align-middle" width={'1%'}> : </td>
                        <td className="text-start"> 
                            <span className="fw-bold"> {capitalizeFirst(auth.user.full_name)} </span>
                            <br />
                            {auth.user.email}
                            <br/>
                            {detail}, {kelurahan}, {kecamatan}, {kabupaten}, {provinsi}
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
        </div>
    )
}

export default LastInvoice;