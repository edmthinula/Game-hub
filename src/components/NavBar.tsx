import { HStack ,Image, Text } from '@chakra-ui/react';
import Logo from "../assets/tj.webp";
import ColorModdSwitch from './ColorModdSwitch';
import SearchInput from './home/searchInput';
interface Props{
  onSearch: (SerchText: string) => void;
}
const NavBar = ({onSearch}:Props) => {
  return (
    <HStack padding='10px' position='absolute' zIndex={10} bg='#1a202c' w='100%' >
        <Image src={Logo} boxSize='60px' borderRadius={20}/>
        <SearchInput onSearch={onSearch}/>
        <ColorModdSwitch/>
    </HStack>
  )
}

export default NavBar