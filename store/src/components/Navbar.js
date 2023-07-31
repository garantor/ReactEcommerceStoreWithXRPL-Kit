import { Button, Container, Navbar, Modal } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from "../CartContext";
import CartProduct from './CartProduct';
import SelectWalletModal from './modal';
import Badge from 'react-bootstrap/Badge';
import { WalletInitContext } from '../WalletContext';


function NavbarComponent() {
    const cart = useContext(CartContext);
    // const usePubKey = useContext(WalletInitContext)
    // console.log(usePubKey)

    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleModalClose = () => setShow(false);



    const checkout = async () => {
        setModal(!modal)
        handleClose()


    }

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);
    const pubKey = cart.publicKey
    console.log(pubKey)

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <h3>
                       <Badge bg="secondary">(address: {pubKey} )</Badge>
                    </h3>


                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ?
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map((currentProduct, idx) => (
                                <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                            ))}

                            <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                            <Button variant="success" onClick={checkout}>
                                Purchase items!
                            </Button>
                        </>
                        :
                        <h1>There are no items in your cart!</h1>
                    }
                </Modal.Body>
            </Modal>
            {modal && <SelectWalletModal isOpen={modal} />}

            {/* {modal && <MydModalWithGrid show={modal} onHide={() => setModal(false)}/>} */}
        </>
    )
}

export default NavbarComponent;