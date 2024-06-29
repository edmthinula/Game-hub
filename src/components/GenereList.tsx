
import { Button, HStack, Image, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import useGenere, { Genere } from '../hooks/useGenere'
import getCroppedImageUrl from '../services/image-url';

interface Props{
  onSelectGenre:(genre:Genere) => void;
}
const GenereList = ({onSelectGenre}:Props) => {
    const {data,isLoading , error} = useGenere(); 

    if (error) return null;
    if (isLoading) return <Spinner/>
  return (
    <List >
        {data.map(genre => <ListItem paddingY='4px' key={genre.id}>
          <HStack>
            <Image
            boxSize='32px'
            borderRadius={8}
          
            src={getCroppedImageUrl (genre.image_background)} />
            <Button onClick={()=> onSelectGenre(genre)} fontSize='lg' variant='link'>
              {genre.name}
              </Button>
          </HStack>
        </ListItem>)}
    </List>
  )
}

export default GenereList