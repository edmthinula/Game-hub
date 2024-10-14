import { Box, Center, HStack ,Text,Image, VStack, Divider} from '@chakra-ui/react'
import React from 'react'
import TJ from '../assets/tj.webp'
import { SocialIcon } from 'react-social-icons'
function Footer(){
  return (
    <div style={{
      backgroundColor: 'rgba(39, 39, 39, 1)',
    }}>
      <Center padding='20px 0 20px 0'>
      <VStack >
        <Box >
          <HStack>
          <Image src={TJ}
          boxSize='40px'
          />       
          </HStack>
        </Box>
        <Text>Copyright 2024 | THINULA JAYAVIHAN  </Text>
        <HStack>
        <SocialIcon url="https://linkedin.com/in/couetilc" style={{
          height: 30,
        }} />
                <SocialIcon url="https://www.linkedin.com/in/thinula-jayavihan-00501827b/" style={{
          height: 30,
        }} />
        </HStack>
      </VStack>
      </Center>
    </div>
  )
}

export default Footer