import {
    VStack,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    ModalFooter,
    Text
  } from "@chakra-ui/react";
  import { Image } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import { CartContext } from "../CartContext";


  import {EsupportedWallet, XRPLKit, Networks} from 'xrpl-wallet-kit'

  



  export default function SelectWalletModal() {
    const [isOpen, setIsOpen] = useState(true);
    // const [userPubKey, setPubKey] = useState();
    const cart = useContext(CartContext);


    function onClose() {
      setIsOpen(false)
    }


async function onClicked(params) {
        console.log(params)
        let kitInstance = new XRPLKit(EsupportedWallet[params], Networks.TESTNET)
        console.log(kitInstance)
        let connect = await kitInstance.connectKitToWallet()
        console.log(connect)
        const userAddress = connect.publicKey.result.address
      setIsOpen(false)
      console.log(userAddress)
      console.log(cart.publicKey)

      // userPubKey = userAddress
      cart.addPublicKey(userAddress)

      // console.log(userPubKey)
      console.log(cart.publicKey)




    }

    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w="300px">
          <ModalHeader>Select Wallet</ModalHeader>
          {/* <ModalCloseButton/> */}
          <ModalBody paddingBottom="1.5rem">
            <VStack>
              <Button
                variant="outline"
                onClick={() => onClicked("XUMM")}

                w="100%"
              >
                <HStack w="100%" justifyContent="center">
                  <Image
                    src="/cbw.png"
                    alt="Coinbase Wallet Logo"
                    width={25}
                    height={25}
                    borderRadius="3px"
                  />
                  <Text>XUMM WALLET</Text>
                </HStack>
              </Button>
              <Button
                variant="outline"
                onClick={() => onClicked("GEM")}
                w="100%"
              >
                <HStack w="100%" justifyContent="center">
                  <Image
                    src="/images.png"
                    alt="Wallet Connect Logo"
                    width={26}
                    height={26}
                    borderRadius="3px"
                  />
                  <Text>GEM WALLET</Text>
                </HStack>
              </Button>
              <Button
                variant="outline"
                onClick={() => onClicked("WALLETCONNECT")}

                w="100%"
              >
                <HStack w="100%" justifyContent="center">
                  <Image
                    src="/mm.png"
                    alt="Metamask Logo"
                    width={25}
                    height={25}
                    borderRadius="3px"
                  />
                  <Text>WALLET CONNECT</Text>
                </HStack>
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
    );
  }
  

