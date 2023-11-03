import { Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const Profile = () => {
    let auth = useSelector(state => state.auth);
    if(auth.user !== null){
        return(
            <>
                
                <Container className="text-start">
                    <h4 >My Account</h4>
                    <br />
                    <Form>
                        <Form.Group className="mb-3" controlId="full_name">
                            <Form.Label>Nama Lengkap</Form.Label>
                            <Form.Control type="text" value={ auth.user.full_name } name="full_name" disabled readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={auth.user.email} name="email" autoComplete="off" disabled readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="role">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" value={auth.user.role} name="role" disabled readOnly />
                        </Form.Group>
                    </Form>
                </Container>
            
            </>
        )
    }
}

export default Profile;