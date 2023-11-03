import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { apiGetCategory } from "../../api/category";
import { apiGetTag } from "../../api/tag";
import { apiPostProduct } from "../../api/product";
import SweetAlert2 from "react-sweetalert2";
import { useNavigate } from "react-router-dom";

const Product = () => {
    const [formAdd, setFormAdd] = useState({ name: '', description: '', price: 0, image: '', category: '' });
    const [arrayTag, setArrayTag] = useState({tags:[]}); 
    const [swalProps, setSwalProps] = useState({});
    const [swalSuccess, setSwalSuccess] = useState({});
    const aRef = useRef(null);

//batas awal tampil data category utk select category
    const [dataCategory, setCategory] = useState([]);
    useEffect(() => {  
        apiGetCategory()
        .then(res => {
            setCategory(res.data);
        })
        .catch(err => {
        console.log(err.message);
        });
    },[]);
//batas akhir tampil data category utk select category

//batas awal tampil data Tags utk checkbox 
    const [dataTag, setTag] = useState([]);
    useEffect(() => {  
        apiGetTag()
        .then(res => {
            res.data.sort((a,b) => (a.name > b.name) ? 1 : -1);
            setTag(res.data);
        })
        .catch(err => {
        console.log(err.message);
        });
    },[]);

//batas akhir tampil data Tags utk checkbox

//batas awal handle value checkbox
const handleChangeCheckbox = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { tags } = arrayTag;
   
    // Case 1 : The user checks the box
    if (checked) {
        setArrayTag({...arrayTag, tags: [...tags, value]});
    }
    // Case 2  : The user unchecks the box
    else {

        setArrayTag({...arrayTag, tags: tags.filter((e) => e !== value)});
    }
};

const uncheckAll2 = (e) => {
    var inputs = document.querySelectorAll('.form-check-input');
    for(var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
  }


//batas akhir handle value checkbox

//batas awal handle add

const addProduct = (e) => {
    e.preventDefault();

    //fungsi utk looping create tags[]
    arrayTag.tags.map((checklist, i) => (
        formAdd[`tags[${i}]`] = checklist
    ));
    //fungsi utk looping create tags[]

    console.log(formAdd)
    apiPostProduct(formAdd)
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

    return(
        <div>
            <Container className="text-start">
                <h4>Tambah Product</h4>
                <Form encType="multipart/form" className="mt-4"  >
                    <Form.Group className="mb-3 text-start" controlId="name">
                        <Form.Label className="ms-1 fw-bold">Nama Produk</Form.Label>
                        <Form.Control size="sm" type="name" value={formAdd.name} name="name" autoComplete="off" placeholder="Masukan Nama Produk" 
                            onChange={(e) => { setFormAdd({...formAdd, name: e.target.value}) }} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start" controlId="description">
                        <Form.Label className="ms-1 fw-bold">Deskripsi Produk</Form.Label>
                        <Form.Control as="textarea" rows={3} value={formAdd.description} name="description" placeholder="Masukan Deskripsi Produk" 
                            onChange={(e) => { setFormAdd({...formAdd, description: e.target.value}) }} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start" controlId="price">
                        <Form.Label className="ms-1 fw-bold">Harga Produk</Form.Label>
                        <Form.Control size="sm" type="number" name="price" value={formAdd.price} placeholder="Masukan Harga Produk" 
                            onChange={(e) => { setFormAdd({...formAdd, price: e.target.value}) }} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start" controlId="image">
                        <Form.Label className="ms-1 fw-bold">Foto Produk</Form.Label>
                        <Form.Control size="sm" type="file" ref={aRef}  name="image"  placeholder="Pilih Foto Produk" 
                            onChange={(e) => { setFormAdd({...formAdd, image: e.target.files[0]}) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3 text-start" controlId="category">
                        <Form.Label className="ms-1 fw-bold">Pilih Kategori</Form.Label>
                        <Form.Select aria-label="Default select example" value={formAdd.category}  onChange={(e) => { setFormAdd({...formAdd, category: e.target.value}) }}>
                            <option>Pilih Kategori</option>
                            {dataCategory.map((category, i) => (
                                <option value={category.name} key={i}>{category.name}</option>
                            ))}            
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 text-start "   >
                        <Form.Label className="ms-1 fw-bold">Pilih Tag <i>(bisa lebih dari satu)</i></Form.Label>
                        <br />
                        <Row>
                            {dataTag.map((tag, i) => (
                            <Col  xs={4} sm={3} md={2}  key={i} >
                                <Form.Check type="checkbox" key={i}  name="tag" value={tag.name} label={tag.name} id={`tag-${i}`}
                                    onChange={handleChangeCheckbox} />
                            </Col>
                            ))}
                        </Row>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={addProduct}>
                        Save
                    </Button>
                </Form>
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
                        aRef.current.value = null;  //utk reset form input file
                        uncheckAll2(); //utk reset form checkbox
                        setFormAdd({ name: '', description: '', price: 0, image: '', category: '' });
                        setArrayTag({tags:[]});
                    }}
                />

{/* batas akhir Handle sweet alert */}

        </div>
    )
}

export default Product;