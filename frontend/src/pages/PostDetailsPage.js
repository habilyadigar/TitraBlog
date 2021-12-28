import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSinglePost, deletePost } from '../actions/postActions';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditPostForm from '../components/EditPostForm';
import Loader from '../components/Loader';
import { Flex, Box, Image, chakra, Spacer, Link, Button, Heading, Text } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const PostDetails = () => {
  const posts = useSelector(state => state.posts);
  const userLogin = useSelector(state => state.userLogin);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentPost, loading, error } = posts;
  const [editMode, setEditMode] = useState(false);
  const { userInfo } = userLogin;
  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  const convertRelativeTime = date => {
    return moment(date).format('LL');
  };

  const removePost = () => {
    try {
      if (window.confirm(`Are you sure? You can't undo this action afterwards.`)) {
        dispatch(deletePost(currentPost?._id));
        toast.success('Blog successfully removed!');
        setTimeout(() => {
          history.push('/posts');
        }, 200);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {error && <p>{error}</p>}
          {editMode ? (
            <EditPostForm post={currentPost} closeEditMode={closeEditMode} />
          ) : (
            <Flex maxW="900px" mx="auto" align="center" justify="center" px={5}>
              <Box w="100%" py={5}>
                <Box py={6}>
                  <Heading as="h1" size="xl" color={('gray.600', 'gray.100')}>
                    {currentPost?.title}
                  </Heading>
                  <Heading
                    as="h2"
                    fontWeight="normal"
                    size="sm"
                    mt={2}
                    fontStyle="italic"
                    color={('gray.600', 'gray.400')}
                  >
                    {currentPost?.subtitle}
                  </Heading>

                  <Box my={6}>
                    <Flex align="center">
                      <Flex align="center" justify="between">
                        <Image
                          h={10}
                          fit="cover"
                          rounded="full"
                          src="https://source.unsplash.com/random/48x48"
                          alt="Avatar"
                        />
                        <Flex align="flex-start" direction="column">
                          <Link mx={3} fontWeight="bold" color={('blue.600', 'brand.200')}>
                            {currentPost?.author}
                          </Link>
                          <chakra.span mx={3} fontSize="sm" color={('gray.600', 'whiteAlpha.600')}>
                            {convertRelativeTime(currentPost?.createdAt)}
                          </chakra.span>
                        </Flex>
                      </Flex>
                      <Spacer />

                      {userInfo?._id === currentPost?.user && (
                        <>
                          <Button colorScheme="blue" mr={3} onClick={openEditMode}>
                            <EditIcon />
                          </Button>
                          <Button onClick={removePost} colorScheme="red">
                            <DeleteIcon />
                          </Button>
                        </>
                      )}
                    </Flex>
                  </Box>

                  <figure style={{ marginBottom: '2rem' }}>
                    <Image
                      w="100%"
                      borderRadius="md"
                      src={currentPost?.image || 'https://loremflickr.com/1920/1080'}
                      alt={currentPost?.tag}
                    />
                    <figcaption style={{ textAlign: 'center', color: '#afacac', fontSize: '0.9rem' }}>
                      Photo by Lopez Robin on Unsplash
                    </figcaption>
                  </figure>
                  <Text mt={4} fontSize="lg" color={('gray.400', 'gray.300')}>
                    {currentPost?.content}
                  </Text>
                </Box>
              </Box>
            </Flex>
          )}
        </div>
      )}
    </>
  );
};

export default PostDetails;
