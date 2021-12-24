import React from "react";
import { Box, Heading, Container, Stack } from "@chakra-ui/react";

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Container
        maxW={"3xl"}
        minH="90vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            TİTRA REACT BLOG APP
          </Heading>
        </Stack>
      </Container>
    </>
  );
}
