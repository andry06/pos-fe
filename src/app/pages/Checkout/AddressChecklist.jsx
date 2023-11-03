import { Button, Card, Col, Form, Table } from "react-bootstrap";

const AddressChecklist = ({dataAddress, handleKonfirmasi, setDataSelect, dataSelect, disabledButton, setDisabledButton}) => {

    return(
        <div>
            <Card.Title className="mt-2 mb-4 text-start">Pilih Alamat Pengiriman : </Card.Title>
            <Col xs={12} className="px-4" >
                <Table className="table table-primary ms-1" striped  bordered hover style={{ fontSize: '88%' }} >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataAddress.map((data, i) => (
                        <tr key={i}>
                            <td className="text-center">
                                <Form.Check  type="radio"  name="idAddress" className="formControl" value={data._id} 
                                    onClick={(e) => { 
                                        setDataSelect({...dataSelect, delivery_address: e.target.value });
                                        setDisabledButton(false)
                                } } />
                            </td>
                            <td>
                                {data.nama}
                            </td>
                            <td className="text-start">
                                {data.detail} , {data.kelurahan}, {data.kecamatan}, {data.kabupaten}, {data.provinsi}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                <Card.Footer className="bg-white text-end">
                    <Button className="btn-primary" disabled={disabledButton} onClick={handleKonfirmasi}>Selanjutnya</Button>
                </Card.Footer>
            </Col>
                    </div>
    )
}

export default AddressChecklist;