import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import Loader from '../components/Loader';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { USER_UPDATE_RESET } from './../constants/UserConstants';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector(state => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdate;

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      dispatch(updateUser(user));
    }
  };

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
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Profile</Heading>
        <form onSubmit={submitHandler}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{error}</AlertTitle>
            </Alert>
          ) : (
            <>
              {loadingUpdate && <Loader />}
              {errorUpdate && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>{error}</AlertTitle>
                </Alert>
              )}
              {successUpdate && (
                <Alert status="success">
                  <AlertIcon />
                  {user.name} Updated Successfully
                </Alert>
              )}
              <Box minW={{ base: '90%', md: '468px' }}>
                <Stack spacing={4} p="1rem" backgroundColor={bg} boxShadow="md">
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        type="text"
                        placeholder="Name and Lastname"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        type="email"
                        placeholder="email address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword}
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
                    Update
                  </Button>
                </Stack>
              </Box>
            </>
          )}
        </form>
      </Stack>
    </Flex>
  );
}
