import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useGenere, { Genere } from "../../hooks/useGenere";
import getCroppedImageUrl from "../../services/image-url";

interface Props {
  onSelectGenre: (genre: Genere) => void;
  selectedGenre: Genere | null;
}
const GenereList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data, isLoading, error } = useGenere();

  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}></Heading>
      <List>
        {data.map((genre) => (
          <ListItem paddingY="4px" key={genre.id}>
            <Button
              width="100%"
              variant={genre.id === selectedGenre?.id ? "solid" : "ghost"}
              colorScheme="gray"
              onClick={() => onSelectGenre(genre)}
              marginBottom="4px"
              display="flex" // Add this line
              alignItems="center" // Add this line
              justifyContent="flex-start"
            >
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
                marginRight="30px"
                marginLeft="30px"
              />
              <span
              style={{
                color:'rgba(211, 211, 211, 1)'
              }}>
                
              {genre.name}
              </span>
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenereList;
