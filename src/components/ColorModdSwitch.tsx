import { HStack, Switch, Text, useColorMode } from '@chakra-ui/react'


const ColorModdSwitch = () => {
    const {toggleColorMode,colorMode} = useColorMode();
  return (
    <HStack>
        <Switch
        colorScheme={'green'}
        isChecked={colorMode === 'dark'} 
        onChange={toggleColorMode} />
        <Text>
            Dark Mood
        </Text>
    </HStack>
  )
}

export default ColorModdSwitch