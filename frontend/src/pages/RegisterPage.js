/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { register } from '../actions/userActions';

export const Register = props => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const bg = useColorModeValue('white', 'gray.800');
  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor={bg}
      justifyContent="center"
      alignItems="center"
    >
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        {loading && <Loader />}
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{error}</AlertTitle>
          </Alert>
        )}
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Create Your Account</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={submitHandler}>
            <Stack spacing={4} p="1rem" backgroundColor={bg} boxShadow="md">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input type="text" placeholder="Name and Lastname" onChange={e => setName(e.target.value)} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input type="email" placeholder="email address" onChange={e => setEmail(e.target.value)} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                  />
                  {showPassword ? 'Hide' : 'Show'}
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full">
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?{' '}
        <Link to={`login?redirect=${redirect}`} color="teal.500">
          Log In
        </Link>
      </Box>
    </Flex>
  );
};
