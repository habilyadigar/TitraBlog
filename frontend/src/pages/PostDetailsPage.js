import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSinglePost, deletePost, createComment } from '../actions/postActions';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditPostForm from '../components/EditPostForm';
import Loader from '../components/Loader';
import { Flex, Box, Image, chakra, Spacer, Link, Button, Heading, Text } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { COMMENT_POST_RESET } from '../constants/PostConstants';
import { Alert, AlertIcon, AlertTitle, Tag } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';

const PostDetails = () => {
  const posts = useSelector(state => state.posts);
  const userLogin = useSelector(state => state.userLogin);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentPost, loading, error } = posts;
  const [editMode, setEditMode] = useState(false);
  const { userInfo } = userLogin;

  const addComment = useSelector(state => state.comment);
  const { loading: loadingReviewCreate, error: errorReviewCreate, success: commentSuccess } = addComment;
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (commentSuccess) {
      window.alert('Comment created successfully!');
      setComment('');
      dispatch({ type: COMMENT_POST_RESET });
    }
    dispatch(fetchSinglePost(id));
  }, [dispatch, id, commentSuccess]);

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  const convertRelativeTime = date => {
    return moment(date).format('LL');
  };

  const submitHandler = e => {
    e.preventDefault();
    if (comment) {
      dispatch(createComment(id, { comment, name: userInfo.name }));
    } else {
      alert('Please enter a comment!');
    }
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
                <div>
                  <h2 id="reviews">Reviews</h2>
                  <ul>
                    <Box mt={6} w="100%" py={5}>
                      {currentPost.reviews.map(review => (
                        <li key={review._id}>
                          <strong>{review.name}</strong>
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </li>
                      ))}
                    </Box>
                    <li>
                      {userInfo ? (
                        <form className="form" onSubmit={submitHandler}>
                          <div>
                            <Tag>Comment</Tag>
                          </div>
                          <div>
                            <Textarea
                              id="comment"
                              value={comment}
                              onChange={e => setComment(e.target.value)}
                              placeholder="Enter your comment"
                            />
                          </div>
                          <div>
                            <label />
                            <Button my={6} colorScheme="blue" type="submit">
                              Send
                            </Button>
                            <div>
                              {loadingReviewCreate && <Loader />}
                              {errorReviewCreate && (
                                <Alert status="error">
                                  <AlertIcon />
                                  <AlertTitle mr={2}>{errorReviewCreate}</AlertTitle>
                                </Alert>
                              )}
                            </div>
                          </div>
                        </form>
                      ) : (
                        <h1>
                          Yorum yapmak için lütfen <Link href="/login">Giriş</Link> yapın
                        </h1>
                      )}
                    </li>
                  </ul>
                </div>
              </Box>
            </Flex>
          )}
        </div>
      )}
    </>
  );
};

export default PostDetails;
