import { useEffect, useState } from "react";
import { apiDeleteAddress, apiGetAddress, apiGetRegionIndonesia, apiPostAddress, apiPutAddress } from "../../api/address"
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import {faEdit, faTrash, faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SweetAlert2 from "react-sweetalert2";

const Address = () => {
    
//batas awal utk handle index view alamat
    const [dataAddress, setAddress] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [swalProps, setSwalProps] = useState({});
    const [swalSuccess, setSwalSuccess] = useState({});
    const [swalConfirm, setSwalConfirm] = useState({});
    const [dataProvinsi, setProvinsi] = useState([]);
    const [dataKabupaten, setKabupaten] = useState([]);
    const [dataKecamatan, setKecamatan] = useState([]);
    const [dataKelurahan, setKelurahan] = useState([]);
    const [formAdd, setFormAdd] = useState({provinsi: '', kabupaten: '', kecamatan: ''});
    const [formEdit, setFormEdit] = useState({});
    const [dataEdit, setDataEdit] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const [reloadEdit, setReloadEdit] = useState(false);
    const [reloadAdd, setReloadAdd] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
   
    //ambil data address utk tampil table address
    useEffect(() => {  
        apiGetAddress()
        .then(res => {
            setAddress(res.data.data);
        })
        .catch(err => {
        console.log(err.message);
        });
    },[refresh]);

    //ambil nilai provinsi
    useEffect(() => { 
            const params='provinces'
            apiGetRegionIndonesia(params)
            .then(res => {
                setProvinsi(res.data)
            })
            .catch(err => {
            console.log(err.message);
            });
         
    },[reloadEdit, reloadAdd]);

    //ambil nilai kabupaten
    useEffect(() => {
        const fetchData = () => {
          if (formAdd.provinsi || dataEdit.provinsi) {
            const provinsi = dataProvinsi.filter(function (obj) {
              if (formAdd.provinsi) {
                return obj.name === formAdd.provinsi;
              }
      
              if (dataEdit.provinsi) {
                if (formEdit.provinsi) {
                  return obj.name === formEdit.provinsi;
                } else {
                  return obj.name === dataEdit.provinsi;
                }
              }
              return undefined;
            });
      
            const params = `regencies/${provinsi[0].id}`;
      
            apiGetRegionIndonesia(params)
              .then((res) => {
                setKabupaten(res.data);
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        };
      
        fetchData(); // Call the fetchData function initially
      
        // Include the variables and fetchData in the dependency array
      }, [formAdd.provinsi, dataProvinsi, formEdit.provinsi]);



    //ambil nilai kecamatan
    useEffect(() => {

        if(formAdd.kabupaten || dataEdit.kabupaten){
            const kabupaten = dataKabupaten.filter(function(obj) { 
                    // return obj.name === formAdd.kabupaten;

                    if(formAdd.kabupaten){
                        return obj.name === formAdd.kabupaten;
                    }
                    
                    if(dataEdit.kabupaten){
                        if(formEdit.kabupaten){
                            return obj.name === formEdit.kabupaten;
                        }else{
                            return obj.name === dataEdit.kabupaten;
                        }
                    }
                    return undefined
            });
            if(kabupaten[0] !== undefined){
                const params=`districts/${kabupaten[0].id}`;

                apiGetRegionIndonesia(params)
                .then(res => {
                    setKecamatan(res.data);
                
                })
                .catch(err => {
                console.log(err.message);
                });
            }
        }
        
    },[formAdd.provinsi, formAdd.kabupaten,  dataKabupaten, formEdit.kabupaten])

    //ambil nilai kelurahan
    useEffect(() => {
        
        if(formAdd.kecamatan || dataEdit.kecamatan){
            const kecamatan = dataKecamatan.filter(function(obj) {
                // return obj.name === formAdd.kecamatan;
                if(formAdd.kecamatan){
                    return obj.name === formAdd.kecamatan;
                }
                
                if(dataEdit.kecamatan){
                    if(formEdit.kecamatan){
                        return obj.name === formEdit.kecamatan;
                    }else{
                        return obj.name === dataEdit.kecamatan;
                    }
                }
                return undefined
              })
            
            if(kecamatan[0] !== undefined){
                const params=`villages/${kecamatan[0].id}`;
                console.log(params)
                apiGetRegionIndonesia(params)
                .then(res => {

                    setKelurahan(res.data);
                })
                .catch(err => {
                console.log(err.message);
                });
            }
        }
        
    },[formAdd.provinsi, formAdd.kabupaten, formAdd.kecamatan,  dataKecamatan]);
 //batas akhir utk handle index view alamat

//batas awal handle add address


    const handleShowAdd = () => { 
        setReloadAdd(!reloadAdd);
        setShowAdd(true);
    };
    const handleCloseAdd = () => {
        setFormAdd({provinsi: '', kabupaten: '', kecamatan: ''});
        setShowAdd(false);
    } 

    const addAddress = (e) => {
        e.preventDefault();
        apiPostAddress(formAdd)
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
                  text: 'Alamat Berhasil ditambahkan'
                }); 
            }
        })
        .catch(err => {
          console.log(err.message);
        });
    }


//batas akhir handle add address

//batas awal handle edit address
    

    const handleCloseEdit = () => {
        setFormEdit({});
        setShowEdit(false);
    } 

    const handleShowEdit = (id) => {
        setReloadEdit(!reloadEdit);
        const Edit =  dataAddress.filter(filter => filter._id === id)
        setDataEdit(Edit[0]);
        setTimeout(function() {
            setShowEdit(true);
        }, 300);
    }
    
    const editAddress = (id) => {

        const nama = document.getElementById("namaEdit").value;
        const detail = document.getElementById("detailEdit").value;
        const kelurahan = document.getElementById("kelurahanEdit").value;
        const kecamatan = (document.getElementById("kecamatanEdit").value === undefined) ? '' : document.getElementById("kecamatanEdit").value
        const kabupaten = (document.getElementById("kabupatenEdit").value === undefined) ? '' : document.getElementById("kabupatenEdit").value
        const provinsi = (document.getElementById("provinsiEdit").value === undefined) ? '' : document.getElementById("provinsiEdit").value
        
   
        setFormEdit({...formEdit, nama, detail, kelurahan, kecamatan, kabupaten, provinsi}) 
        
        apiPutAddress(id, formEdit)
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
                text: 'Alamat baru berhasil diedit'
                }); 
            }
            
        })
        .catch(err => {
        console.log(err.message);
        });

    }

//bataas akhir handle edit address

//batas awal handle delete address
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
                apiDeleteAddress(id)
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
                            text: 'Data ini berhasil di Delete'
                        }); 
                    }
                }).catch(err => {
                    console.log(err.message);
                });
            }
        }
    })
}
//batas akhir handle delete address


    return (
        
        <div className="text-start">
            
{/* batas awal index address */}
        <Container>
            <h4 className="text-start">Daftar Alamat</h4> 
            <Button className="btn btn-sm btn-success my-3" onClick={handleShowAdd}> <FontAwesomeIcon icon={faAdd} /> Tambah</Button>
            <Table striped bordered style={{ fontSize: '90%' }} >
                <thead>
                    <tr>
                        <th>No</th>
                        <th className="text-center">Nama</th>
                        <th className="text-center">Detail</th>
                        <th width="15%" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAddress.map((data, i) => (
                        <tr key={i}>
                            <td className="text-center align-middle">{i+1}</td>
                            <td className="align-middle">{data.nama}</td>
                            <td className="align-middle">{data.detail}, {data.kelurahan}, {data.kecamatan}, {data.kabupaten}, {data.provinsi} </td>
                            <td className="text-center align-middle">
                                <Button className="btn btn-sm btn-success ms-2 mb-1"
                                    onClick={() => handleShowEdit(data._id) }> <FontAwesomeIcon icon={faEdit} /> </Button>
                                <Button className="btn btn-sm btn-danger ms-2 mb-1" 
                                    onClick={() => handleDelete(data._id) }> <FontAwesomeIcon icon={faTrash} /> </Button>
                            </td>
                        </tr>

                     ))}
                </tbody>
                </Table>
            </Container>    
                <SweetAlert2 {...swalProps}
                    didClose={() => {
                        setSwalProps({
                            show: false,
                        });
                        setFormAdd({provinsi: '', kabupaten: '', kecamatan: ''});
                        setFormEdit({});
                    }}
                />

                <SweetAlert2 {...swalSuccess}
                    didClose={() => {
                        setSwalSuccess({
                            show: false,
                        });
                        setFormAdd({provinsi: '', kabupaten: '', kecamatan: ''});
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

{/* batas awal index address */}

{/* batas awal Modal add  */}

    <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static">
        <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title className="h6">Tambah Alamat</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight: '400px', overflowY: 'scroll' }}>
            <Form>
                <Form.Group className="mb-3 text-start fw-bold" controlId="nama">
                    <Form.Label className="ms-1">Nama Alamat Baru</Form.Label>
                    <Form.Control size="sm" type="name" name="nama" placeholder="Masukan Nama Alamat Baru" 
                        onChange={(e) => { setFormAdd({...formAdd, nama: e.target.value}) }} />
                </Form.Group>
                
                <Form.Group className="mb-3 text-start fw-bold" controlId="provinsi">
                    <Form.Label className="ms-1">Provinsi</Form.Label>
                    <Form.Select aria-label="provinsi" name="provinsi" 
                         onChange={(e) => { setFormAdd({...formAdd, provinsi: e.target.value});
                            }}>
                            <option>Pilih Provinsi</option>
                           {dataProvinsi.map((row, i) => (
                                <option value={row.name} key={i}>{row.name}</option>
                            ))}             
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 text-start fw-bold" controlId="Kabupaten">
                    <Form.Label className="ms-1">Kabupaten</Form.Label>
                    <Form.Select aria-label="kabupaten" name="kabupaten" 
                         onChange={(e) => { setFormAdd({...formAdd, kabupaten: e.target.value});
                            }}>
                            <option>Pilih Kabupaten</option>
                           {dataKabupaten.map((row, i) => (
                                <option value={row.name} key={i}>{row.name}</option>
                            ))}             
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 text-start fw-bold" controlId="kecamatan">
                    <Form.Label className="ms-1">Kecamatan</Form.Label>
                    <Form.Select aria-label="kecamatan" name="kecamatan" 
                         onChange={(e) => { setFormAdd({...formAdd, kecamatan: e.target.value});
                            }}>
                            <option>Pilih Kecamatan</option>
                           {dataKecamatan.map((row, i) => (
                                <option value={row.name} key={i}>{row.name}</option>
                            ))}             
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 text-start fw-bold" controlId="kelurahan">
                    <Form.Label className="ms-1">Kelurahan</Form.Label>
                    <Form.Select aria-label="kelurahan" name="kelurahan" 
                         onChange={(e) => { setFormAdd({...formAdd, kelurahan: e.target.value});
                            }}>
                            <option>Pilih Kelurahan</option>
                           {dataKelurahan.map((row, i) => (
                                <option value={row.name} key={i}>{row.name}</option>
                            ))}             
                    </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3 text-start fw-bold" controlId="detail">
                    <Form.Label className="ms-1">Detail Alamat</Form.Label>
                    <Form.Control as="textarea" rows={2} name="detail" placeholder="Masukan Detail Alamat" 
                        onChange={(e) => { setFormAdd({...formAdd, detail: e.target.value}) }} />
                </Form.Group>


            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
                Close
            </Button>
            <Button variant="primary" onClick={addAddress}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
{/* batas akhir Modal add  */}

{/* batas awal Modal Edit  */}

<Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
        <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title className="h6">Edit Alamat</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight: '400px', overflowY: 'scroll' }}>
            <Form>  
                <Form.Group className="mb-3 text-start fw-bold" controlId="namaEdit">
                    <Form.Label className="ms-1">Nama Alamat Baru</Form.Label>
                    <Form.Control size="sm" type="name" name="namaEdit" defaultValue={dataEdit.nama}  placeholder="Masukan Nama Alamat Baru" 
                        onChange={(e) => { setFormEdit({...formEdit, nama: e.target.value}) }} />
                </Form.Group>

                <Form.Group className="mb-3 text-start fw-bold" controlId="provinsiEdit">
                    <Form.Label className="ms-1">Provinsi</Form.Label>
                    <Form.Select aria-label="provinsiEdit" name="provinsiEdit" defaultValue={dataEdit.provinsi}
                         onChange={(e) => { 
                            
                            setFormEdit({...formEdit, provinsi: e.target.value});

                            ;
                            }}>
                            <option>Pilih Provinsi</option>
                           {dataProvinsi.map((row, i) => (
                                <option value={row.name} key={i}>{row.name}</option>
                            ))}             
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 text-start fw-bold" controlId="kabupatenEdit">
                    <Form.Label className="ms-1">Kabupaten</Form.Label>
                    <Form.Select aria-label="kabupatenEdit" name="kabupatenEdit" defaultValue={dataEdit.kabupaten}
                         onChange={(e) => { setFormEdit({...formEdit, kabupaten: e.target.value});
                            }}>
                            <option value="tidak_ada">Pilih Kabupaten</option>
                           {dataKabupaten.map((row, i) => (
                                <option value={row.name} key={i}>{row.name}</option>
                            ))}             
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 text-start fw-bold" controlId="kecamatanEdit">
                    <Form.Label className="ms-1">Kecamatan</Form.Label>
                    <Form.Select aria-label="kecamatanEdit" name="kecamatanEdit" defaultValue={dataEdit.kecamatan} 
                     onChange={(e) => { setFormEdit({...formEdit, kecamatan: e.target.value});
                        }}>
                        <option >Pilih Kecamatan</option>
                       {dataKecamatan.map((row, i) => (
                            <option value={row.name} key={i}>{row.name}</option>
                        ))}             
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 text-start fw-bold" controlId="kelurahanEdit">
                    <Form.Label className="ms-1">Kelurahan</Form.Label>
                    {/* <Form.Control size="sm" type="name" name="kelurahanEdit" defaultValue={dataEdit.kelurahan} placeholder="Masukan Nama Kelurahan"
                        onChange={(e) => { setFormEdit({...formEdit, kelurahan: e.target.value}) }} /> */}
                    <Form.Select aria-label="kelurahanEdit" name="kelurahanEdit" defaultValue={dataEdit.kelurahan} 
                     onChange={(e) => { setFormEdit({...formEdit, kelurahan: e.target.value});
                        }}>
                        <option >Pilih Kelurahan</option>
                       {dataKelurahan.map((row, i) => (
                            <option value={row.name} key={i}>{row.name}</option>
                        ))}             
                    </Form.Select>    
                </Form.Group>
               

                <Form.Group className="mb-3 text-start fw-bold" controlId="detailEdit">
                    <Form.Label className="ms-1">Detail Alamat</Form.Label>
                    <Form.Control as="textarea" rows={2} name="detailEdit" defaultValue={dataEdit.detail} placeholder="Masukan Detail Alama"
                        onChange={(e) => { setFormEdit({...formEdit, detail: e.target.value}) }} />
                </Form.Group>
               
               

            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
                Close
            </Button>
            <Button variant="primary" onClick={() => editAddress(dataEdit._id) }>
                Save Changes
            </Button>
        </Modal.Footer>

    </Modal>
{/* batas akhir Modal Edit  */}
        </div>

    )
}


export default Address;