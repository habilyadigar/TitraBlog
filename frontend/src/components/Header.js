import React from "react";
import {
  chakra,
  useColorModeValue,
  Flex,
  Button,
  Link,
} from "@chakra-ui/react";
import Logo from "../images/logo.png";
import { useDisclosure } from "@chakra-ui/hooks";

const Header = () => {
  const bg = useColorModeValue("white", "gray.800");
  const { onOpen } = useDisclosure();

  return (
    <>
      <chakra.header bg={bg} w="full" px={5} py={1} shadow="md" mx="auto">
        <Flex align="center" justify="space-between" mx="auto" maxW="1420px">
          <Flex>
            <chakra.a
              href={"/"}
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <Logo />
            </chakra.a>
          </Flex>
          <Flex align="center">
            <Link
              display="block"
              color={useColorModeValue("gray.800", "white")}
              fontSize="lg"
              href={"/posts"}
              rounded={"md"}
            >
              Posts
            </Link>
            <Button ml="10" colorScheme="teal" size="sm" onClick={onOpen}>
              New Post
            </Button>
          </Flex>
        </Flex>
      </chakra.header>
    </>
  );
};

export default Header;
