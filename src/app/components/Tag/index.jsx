import { useEffect, useState } from "react";
import { apiDeleteTag, apiGetTag, apiPostTag, apiPutTag } from "../../api/tag";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import SweetAlert2 from "react-sweetalert2";

const Tag = () => {

    const [dataTag, setTag] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [swalProps, setSwalProps] = useState({});
    const [swalSuccess, setSwalSuccess] = useState({});
    const [swalConfirm, setSwalConfirm] = useState({});

    //batas awal tampil category
    useEffect(() => {  
        apiGetTag()
        .then(res => {
            setTag(res.data);
        })
        .catch(err => {
        console.log(err.message);
        });
    },[refresh]);

    //batas awal tampil category

        //batas awal handle add
        const [formAdd, setFormAdd] = useState({});
        const [showAdd, setShowAdd] = useState(false);
        const handleShowAdd = () => setShowAdd(true);
        const handleCloseAdd = () => {
            setFormAdd({});
            setShowAdd(false);
        } 
    
        const addTag = (e) => {
            e.preventDefault();
           
            apiPostTag(formAdd)
            .then(res => {
                console.log(res)
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
                      text: 'Tag Baru Berhasil ditambahkan'
                    }); 
                }
            })
            .catch(err => {
              console.log(err.message);
            });
        }
//batas akhir handle add

//batas awal handle edit 
const [formEdit, setFormEdit] = useState({});
const [dataEdit, setDataEdit] = useState([]);
const [showEdit, setShowEdit] = useState(false);

const handleCloseEdit = () => {
    setFormEdit({});
    setShowEdit(false);
} 

const handleShowEdit = (id) => {
    setShowEdit(true);
    const showEdit =  dataTag.filter(filter => filter._id === id)
    setDataEdit(showEdit[0]);
}

const editTag = (id) => {
    
    const name = document.getElementById("nameEdit").value;
    setFormEdit({...formEdit, name}) 
    apiPutTag(id, formEdit)
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
            text: 'Tags ini Berhasil diedit'
            }); 
        }
        
    })
    .catch(err => {
    console.log(err.message);
    });

}

//bataas akhir handle edit 

//batas awal handle delete 
const handleDelete = (id) => {
    setSwalConfirm({
        show: true,
        title: 'Apa anda yakin?',
        text: "data yang di delete tidak akan bisa di kembalikan lagi !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',                    
        preConfirm: (iya) => {
            if(iya){
                apiDeleteTag(id)
                .then(res => {
                    if(res.data.error){
                        setSwalProps({
                            show: true,
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.message,
                        });
                    }else{
                        setSwalSuccess({
                            show: true,
                            icon: 'success',
                            title: 'SUCCESS',
                            text: 'Data ini berhasil di delete'
                        }); 
                    }
                }).catch(err => {
                    console.log(err.message);
                });
            }
        }
    })
}
//batas akhir handle delete 

    return (
        <div>
            <Container>
                <Row>
                    <Col sm={6} className="text-start">
                        <h4 >Daftar Tags</h4> 
                        <Button className="btn btn-sm btn-success my-3" onClick={handleShowAdd} > <FontAwesomeIcon icon={faAdd} /> Tambah</Button>
                        <Table striped bordered style={{ fontSize: '90%' }} >
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th className="text-center">Nama</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataTag.map((data, i) => (
                                    <tr key={i}>
                                        <td className="text-center align-middle">{i+1}</td>
                                        <td className="align-middle">{data.name}</td>
                                        <td className="text-center align-middle">
                                            <Button className="btn btn-sm btn-success ms-2 mb-1"
                                                onClick={() => handleShowEdit(data._id) } > <FontAwesomeIcon icon={faEdit} /> </Button>
                                            <Button className="btn btn-sm btn-danger ms-2 mb-1" 
                                                onClick={() => handleDelete(data._id) } > <FontAwesomeIcon icon={faTrash} /> </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

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
                        setFormAdd({});
                        handleCloseAdd();
                        setFormEdit({});
                        handleCloseEdit();
                        setRefresh(!refresh);
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
                        setRefresh(!refresh);
                    }}
                />
{/* batas akhir Handle sweet alert */}

{/* batas awal Modal add  */}
    <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static">
        <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title className="h6">Tambah Alamat</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight: '400px', overflowY: 'scroll' }}>
            <Form>
                <Form.Group className="mb-3 text-start fw-bold" controlId="name">
                    <Form.Label className="ms-1">Nama Kategori Baru</Form.Label>
                    <Form.Control size="sm" type="name" name="name" placeholder="Masukan Nama Tag Baru" 
                        onChange={(e) => { setFormAdd({...formAdd, name: e.target.value}) }} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
                Close
            </Button>
            <Button variant="primary" onClick={addTag}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
{/* batas akhir Modal add  */}

{/* batas awal Modal Edit  */}

<Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
        <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title className="h6">Edit Kategori</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight: '400px', overflowY: 'scroll' }}>
            <Form>  
                <Form.Group className="mb-3 text-start fw-bold" controlId="nameEdit">
                    <Form.Label className="ms-1">Nama Kategori</Form.Label>
                    <Form.Control size="sm" type="name" name="nameEdit" defaultValue={dataEdit.name}  placeholder="Masukan Nama Kategori" 
                        onChange={(e) => { setFormEdit({...formEdit, name: e.target.value}) }} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
                Close
            </Button>
            <Button variant="primary" onClick={() => editTag(dataEdit._id) }>
                Save Changes
            </Button>
        </Modal.Footer>

    </Modal>
{/* batas akhir Modal Edit  */}

        </div>
    )
}

export default Tag;