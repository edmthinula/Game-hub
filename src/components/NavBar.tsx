import { HStack ,Image, Text } from '@chakra-ui/react';
import Logo from "../assets/tj.webp";
import ColorModdSwitch from './ColorModdSwitch';
import SearchInput from './searchInput';

const NavBar = () => {
  return (
    <HStack padding='10px'>
        <Image src={Logo} boxSize='60px'/>
        <SearchInput/>
        <ColorModdSwitch/>
    </HStack>
  )
}

export default NavBar