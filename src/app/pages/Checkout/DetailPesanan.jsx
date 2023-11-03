import { Button, Card, Col, Image, Row, Table } from "react-bootstrap";
import { rupiahFormat } from "../../capitalize";

const DetailPesanan = ({dataFilterId, dataCart, subTotal, dataSelect, handleBefore, handleBayar}) => {
    return (
        <div>
        <Card.Title className="mt-2 mb-4 text-start">Konfirmasi : </Card.Title>
        <Col xs={12}>
         <Table className="table table-responsive" hover responsive style={{ fontSize: '88%' }} >
            <tbody>
                <tr>
                    <td className="text-start fw-bold" width={'15%'}>Alamat</td>
                    <td className="text-start fw-bold" width={'1%'}> : </td>
                    <td className="text-start fw-bold">{dataFilterId.detail}, {dataFilterId.kelurahan}, {dataFilterId.kecamatan}, {dataFilterId.kabupaten}. {dataFilterId.provinsi} </td>  
                </tr>
              
            </tbody>
          </Table>

          <br />
          <Card.Title className="mt-2 mb-4 text-start">Detail Pesanan : </Card.Title>
          <Table className="table table-responsive" hover responsive style={{ fontSize: '88%' }} >
            <thead>
                <tr>
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
                    <td><Image src={`http://localhost:3000/public/images/products/${data.image_url}`} width={80} height={70} rounded /></td>
                    <td className="align-middle">{data.name}</td>
                    <td className="align-middle ">{rupiahFormat(data.price)}</td>
                    <td className="align-middle">
                          {data.qty}
                     </td>
                     <td className="align-middle text-end pe-4">{rupiahFormat(data.price*data.qty)}</td>
                </tr>
            ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={4} className="fw-bold text-end ">Sub Total : </td>
                    <td className="fw-bold text-end pe-4">
                        {rupiahFormat(subTotal)}
                    </td> 
                </tr>
                <tr>
                    <td colSpan={4} className="fw-bold text-end ">Ongkir : </td>
                    <td className="fw-bold text-end pe-4">
                        {rupiahFormat(dataSelect.delivery_fee)}
                    </td> 
                </tr>
                <tr>
                    <td colSpan={4} className="fw-bold text-end ">Total Semua : </td>
                    <td className="fw-bold text-end pe-4">
                     {rupiahFormat(parseInt(dataSelect.delivery_fee) + parseInt(subTotal))}
                    </td> 
                </tr>
            </tfoot>
        </Table>
        </Col>  
    
     <Card.Footer  className="bg-white">
        <Row>
            <Col sm={6} className="text-start">
                <Button className="btn-success" onClick={handleBefore}>Sebelumnya</Button>
            </Col>
            <Col sm={6} className="text-end">
                <Button className="btn-primary" onClick={handleBayar}>Bayar</Button>
            </Col>
        </Row>
    </Card.Footer>
    </div>
    )
}

export default DetailPesanan;