import { Box, Heading, Container, Text, Button, Stack, Link } from '@chakra-ui/react';

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Container maxW={'3xl'} minH="90vh" display="flex" alignItems="center" justifyContent="center">
        <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
            <Text as={'span'} color={'green.400'} bgGradient="linear(to-r, #30CFD0 0%, #ce47e7 100%)" bgClip="text">
              TİTRA BLOG APP
            </Text>
          </Heading>
          <Stack direction={'column'} spacing={3} align={'center'} alignSelf={'center'} position={'relative'}>
            <Button
              as={Link}
              href={'/posts'}
              colorScheme={'green'}
              bg={'green.500'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.600',
              }}
              color={'gray.100'}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
