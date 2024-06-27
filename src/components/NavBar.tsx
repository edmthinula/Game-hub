import { HStack ,Image, Text } from '@chakra-ui/react';
import Logo from "../assets/tj.webp";
import ColorModdSwitch from './ColorModdSwitch';

const NavBar = () => {
  return (
    <HStack justifyContent={'space-between'} padding='10px'>
        <Image src={Logo} boxSize='60px'/>
        <ColorModdSwitch/>
    </HStack>
  )
}

export default NavBar