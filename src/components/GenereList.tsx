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
import useGenere, { Genere } from "../hooks/useGenere";
import getCroppedImageUrl from "../services/image-url";

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
            <HStack>
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                onClick={() => onSelectGenre(genre)}
                fontSize="lg"
                variant="link"
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenereList;
