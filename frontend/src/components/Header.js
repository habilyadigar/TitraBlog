/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { chakra, useColorModeValue, Flex, Button, Link, Portal } from '@chakra-ui/react';
import Logo from '../images/Logo';
import AddPostForm from './AddPostForm';
import { useDisclosure } from '@chakra-ui/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const bg = useColorModeValue('white', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <chakra.header bg={bg} w="full" px={5} py={1} shadow="md" mx="auto">
        <Flex align="center" justify="space-between" mx="auto" maxW="1420px">
          <Flex>
            <chakra.a href={'/'} title="Titra Blog Home Page" display="flex" alignItems="center">
              <Logo />
            </chakra.a>
          </Flex>
          <Flex align="center">
            <Link
              display="block"
              color={useColorModeValue('gray.800', 'white')}
              fontWeight="bold"
              fontSize="lg"
              href={'/posts'}
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
              }}
            >
              Posts
            </Link>
            {userInfo && (
              <Button ml="10" className="header-post" colorScheme="teal" size="sm" onClick={onOpen}>
                New Post
              </Button>
            )}
            {userInfo ? (
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <Link to="#">{userInfo.name}</Link>
                </MenuButton>
                <Portal>
                  <MenuList>
                    <Link href={'/profile'}>
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link to="#logout" onClick={logoutHandler}>
                      <MenuItem>LogOut</MenuItem>
                    </Link>
                  </MenuList>
                </Portal>
              </Menu>
            ) : (
              <Link
                href={'/login'}
                display="block"
                color={useColorModeValue('gray.800', 'white')}
                fontWeight="bold"
                fontSize="lg"
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
              >
                Login
              </Link>
            )}
          </Flex>
        </Flex>
      </chakra.header>
      <AddPostForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
