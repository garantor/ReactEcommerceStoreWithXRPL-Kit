import { Button, Container, Navbar, Modal } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from "../CartContext";
import CartProduct from './CartProduct';
import SelectWalletModal from './modal';
import Badge from 'react-bootstrap/Badge';


function NavbarComponent() {
    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleModalClose = () => setShow(false);
    const [txResult, settxResult] = useState();




    const checkout = async () => {
        handleClose()

        console.log("this is it ")
        const kit = cart.kit
        let selectedwallet = await kit.getSelectedWallet()
        console.log(selectedwallet)
        let amount = Math.ceil(cart.getTotalCost())
        console.log(amount)
        console.log(`${amount}0000000`)
        // "destination": "r4MPsJ8SmQZGzk4dFxEoJHEF886bfX4rhu",
        // "amount": `${amount}0000000` //need to fix price precision

       let tx;
        switch (selectedwallet) {
            case "GEMWallet":
                console.log("this is a gem tranaction")
                tx = ({
                    
                        "TransactionType": "TrustSet",
                        "Account": cart.publicKey,
                        "LimitAmount": {
                          "currency": "USD",
                          "issuer": "r4MPsJ8SmQZGzk4dFxEoJHEF886bfX4rhu",
                          "value": "100"
                        },
                    
                   
                    })
                    console.log("gem wallet ",tx)
                    const sendTxGem =  await kit.signTransaction(tx)
                    settxResult(sendTxGem)
            
                    console.log("sendTxGem ", sendTxGem)
                break;
            case "XUMM":
                console.log("this is a XUMM tranaction")
                tx = ({
                       "TransactionType":"Payment",
                       "Account":cart.publicKey,
                       "Destination":"r4MPsJ8SmQZGzk4dFxEoJHEF886bfX4rhu",
                       "Amount": `${amount}0000000`
                 }) 
                 
                 console.log("this is xumm wallet ",tx)
                 const sendTxXumm =  await kit.signTransaction(tx)
                 settxResult("sendTxXumm", sendTxXumm)
         
                 console.log(sendTxXumm)
                break;
            case 'WalletConnect':
                let wcId = kit.getNetwork()
                console.log('this is the wcid ',wcId)
                console.log("this is a WALLETCOnnect tranaction")
                let transaction =  {tx_json:{
                    "TransactionType":"Payment",
                    "Account":cart.publicKey,
                    "Destination":"r4MPsJ8SmQZGzk4dFxEoJHEF886bfX4rhu",
                    "Amount": `${amount}000000`
                 }}

                tx = ({
                    request: {
                      method: "xrpl_signTransaction",
                      params: [transaction]
                    },
                    chainId: wcId.walletconnectId
                  })

                 console.log("this is xumm wallet ",tx)
                 const sendTxWC =  await kit.signTransaction(tx)
                 settxResult("sendTxWC", sendTxWC)
         
                 console.log(sendTxWC)
                
                break;
        
            default:
                break;
        }
      
        


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
                       <Badge bg="secondary"> {pubKey ? (pubKey.slice(0, 4) + "..." + pubKey.slice(-4)) : "Connect address"} </Badge>
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

            {/* {txResult && <TxModal/>} */}

        </>
    )
}

export default NavbarComponent;