import { Badge, Button, Card } from "react-bootstrap";
import { capitalizeFirst, rupiahFormat } from "../../capitalize";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardProduct = ({data, AddToCart}) => {


    return (
            <Card className="mt-4" style={{ minHeight: '420px' }}>
                <Card.Img variant="top" src={`http://localhost:3000/public/images/products/${data.image_url}`} height={175}/>
                <Card.Body>
                    <Card.Title className="text-center h6">{data.name}</Card.Title>
                    <Badge bg="primary mb-2">Kategori: {capitalizeFirst(data.category.name)}</Badge>
                    <Card.Text style={{ fontSize: '80%', textAlign: 'justify'}}>
                        {data.description.slice(0, 90)} 
                        <br/>
                    </Card.Text>
                   
                    <Card.Text className="text-center text-danger">
                        {rupiahFormat(data.price)}
                    </Card.Text>

                </Card.Body>
                <Card.Footer className="btn text-white text-center bg-primary" onClick={() => AddToCart(data._id)} >  <FontAwesomeIcon  icon={faCartPlus} /> Add to Cart</Card.Footer> 
            </Card>

    )
}

export default CardProduct;