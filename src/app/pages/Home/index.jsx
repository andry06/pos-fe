import { Card, Col, Container, Form, Row } from "react-bootstrap";
import CardProduct from "../../components/CardProduct";
import { apiGetProduct } from "../../api/product";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirst } from "../../capitalize";
import { apiGetTag } from "../../api/tag";
import { actSetPage, actSetTags, actSetTotalItem } from "../../features/Product/actions";
import ReactPaginate from "react-paginate";
import { apiSaveCart } from "../../api/cart";
import { actAddItem } from "../../features/Cart/actions";


const HomePage = () => {
    const dispatch = useDispatch();
    const produk = useSelector(state => state.product);
    const cart = useSelector(state => state.cart);
    const [notFound, setNotFound] = useState(false);
    const [mount, setMount] = useState(false);    
    let dataFilterTags = {};


    //batas awal utk skip dan limit
    const skip = produk.currentPage*produk.limitPage;
    //batas akhir skip dan limit

    //total Page
    const totalPage = Math.ceil(produk.totalItem/produk.limitPage);

    let query = `q=${produk.search}&category=${produk.category}&skip=${skip}&limit=${produk.limitPage}`
    produk.tags.map((checklist) => (
        query += `&tags=${checklist}`
    ));
        
    //batas awal tampil data
    const [dataProduct, setDataProduct] = useState([]);
    useEffect(() => {  
        apiGetProduct(query)
        .then(res => {
            if(res.data.data.length === 0){
                setNotFound(true)
            }else{
                setNotFound(false)
                setDataProduct(res.data.data);
                dispatch(actSetTotalItem(res.data.count))
            }
        })
        .catch(err => {
        console.log(err.message);
    });
    },[query, dispatch]);

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

    //batas awal handle value checkbox
    const handleChangeCheckbox = (e) => {
        const { value, checked } = e.target;
        const { tags } = produk;

        // Case 1 : The user checks the box
        if (checked) {
            dispatch(actSetTags([...tags, value]));
        }
        // Case 2  : The user unchecks the box
        else {
            dispatch(actSetTags(tags.filter((e) => e !== value)));
        }
    };

    //handle pagination page
    const handlePageClick = (data) => {
        dispatch(actSetPage(data.selected));
    }
   
    // batas awal handle button product add to cart
    const AddToCart = (data) => {
        dispatch(actAddItem({_id: data}))
        setMount(true)
    }

    useEffect(() => {
        if(mount){
            console.log(cart)
            localStorage.setItem('cart', JSON.stringify(cart));
            apiSaveCart(cart)
            .then(() => {
              
            })
            .catch(err => {
            console.log(err.message);
        });
        }  
    }, [mount, cart])

    // batas akhir handle button product add to cart
    return(
        <div>
            
            <Container  className="text-start" style={{minHeight: '392px' ,marginBottom: '100px', marginTop: '70px' }}>

            <span className="text-muted">Kategori Terpilih : { produk.category ? capitalizeFirst(produk.category) : 'Semua'}</span>
                <Card className="mt-2 border-primary">
                    <Card.Body>

                    Tags :
                    <Row>
                    {dataTag.map((tag, i) => (
                        dataFilterTags = produk.tags.filter(function(tagsFilter) {
                            return tagsFilter === tag.name
                        }),
                        <Col xs={3} sm={2} md={1}  key={i} >
                            <Form.Check type="checkbox" key={i} name="tag" value={tag.name} label={tag.name} id={`tag-${i}`}
                                checked={(dataFilterTags.length === 0) ? false : true  }
                                onChange={handleChangeCheckbox} />
                        </Col>
                    ))}
                    </Row>

                    </Card.Body>
                </Card>
                <Row>
                    {notFound ? 
                    <Col className="h1 text-center" style={{ marginBottom: '100px', marginTop: '170px'  }}>
                        Data Tidak Tersedia
                    </Col>
                    :
                    dataProduct.map((data, i)=> (
                        <Col md={3} sm={4} xs={6} key={i} >
                            <CardProduct data={data} AddToCart={AddToCart} cart={cart}/> 
                        </Col>
                    ))}   
                </Row>

                <Row className="justify-content-center mb-4">
                   {totalPage > 0 &&
                    <ReactPaginate 
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        pageCount={totalPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination justify-content-center mt-4'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        activeClassName={'active'}
                        initialPage={(produk.currentPage)}
                        disableInitialCallback={false}    
                    />
}
                    Total Data : {produk.totalItem} Items
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;