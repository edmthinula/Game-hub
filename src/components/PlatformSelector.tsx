import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { BsChevronBarDown } from 'react-icons/bs'
import usePlatforms from '../hooks/usePlatforms'
import { platform } from '../hooks/useGames'

interface Props{
  onselectPlatform : (Platform: platform) => void;
  selectedPlatform : platform | null;
}

export const PlatformSelector = ({onselectPlatform, selectedPlatform}:Props) => {
    const {data , error}= usePlatforms();

    if (error) return null;
  return (
    <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronBarDown/>}>
        {selectedPlatform?.name ||'Select Platform'}
        </MenuButton>
        <MenuList>
            {data.map(platform=>
                <MenuItem
                onClick={()=> onselectPlatform(platform)}
                key={platform.id}>{platform.name}</MenuItem>)}
        </MenuList>
    </Menu>
  )
}
