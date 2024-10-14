import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spacer,
  HStack,
  Image,
  Heading,
  Center,
  Text,
} from "@chakra-ui/react";
import Tj from "../../assets/tj.webp";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
interface NavbarProps {
  title: string;
}
function Navbar({ title }: NavbarProps) {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Center>
        <HStack
          padding="30px"
          zIndex="10"
          position="absolute"
          justifyContent="space-between"
          marginTop="140px"
          width="80%"
          background="rgba(39, 39, 39, 1)"
          borderRadius="40px"
        >
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.200" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Text fontSize="2xl">Home</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                <Text fontSize="2xl">{title}</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Spacer />
          <Link to={"/"}>
            <HStack>
              <Image src={Tj} alt="TJ" boxSize="50px" />
              <Heading>Game Hub</Heading>
            </HStack>
          </Link>
        </HStack>
      </Center>
    </div>
  );
}

export default Navbar;
