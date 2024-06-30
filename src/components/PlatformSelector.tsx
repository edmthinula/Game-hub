import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { BsChevronBarDown } from 'react-icons/bs'
import usePlatforms from '../hooks/usePlatforms'

export const PlatformSelector = () => {
    const {data , error}= usePlatforms();

    if (error) return null;
  return (
    <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronBarDown/>}>
        Platform
        </MenuButton>
        <MenuList>
            {data.map(platform=>
                <MenuItem key={platform.id}>{platform.name}</MenuItem>)}
            

        </MenuList>
    </Menu>
  )
}
