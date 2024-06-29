
import { HStack, Image, List, ListItem, Text } from '@chakra-ui/react';
import useGenere, { Genere } from '../hooks/useGenere'
import getCroppedImageUrl from '../services/image-url';


const GenereList = () => {
    const {data} = useGenere(); 
  return (
    <List >
        {data.map(genre => <ListItem paddingY='4px' key={genre.id}>
          <HStack>
            <Image
            boxSize='32px'
            borderRadius={8}
          
            src={getCroppedImageUrl (genre.image_background)} />
            <Text>
              {genre.name}
              </Text>
          </HStack>
        </ListItem>)}
    </List>
  )
}

export default GenereList