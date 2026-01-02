import React from "react";
import { Button, Link, Spinner } from "@chakra-ui/react";
import useStoreName from "../../hooks/useStoreName";

interface Props {
  storeId: string;
  url: string;
}

const StoreButton = ({ storeId, url }: Props) => {
  const { data, error, isLoading } = useStoreName(storeId || "");

  if (isLoading) {
    return <Button isLoading colorScheme="teal" size="md" />;
  }

  if (error || !data) {
    return (
      <Button colorScheme="red" size="md" isDisabled>
        Store Not Found
      </Button>
    );
  }
  return (
    <Link href={url} isExternal _hover={{ textDecoration: "none" }}>
      <Button colorScheme="teal" size="md">
        {data.name}
      </Button>
    </Link>
  );
};

export default StoreButton;
