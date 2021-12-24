/* eslint-disable react/prop-types */
import React from "react";
import moment from "moment";
import "moment/locale/en-gb";
import { Image, chakra, Link, Box, Flex, Spacer } from "@chakra-ui/react";

const Post = ({ post }) => {
  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  return (
    <>
      <Image
        roundedTop="lg"
        w="full"
        h={64}
        fit="cover"
        src={post?.image || "https://loremflickr.com/648/256"}
      />

      <Box p={6}>
        <Box>
          <Link href={`posts/${post._id}`}>{post.title}</Link>
          <chakra.p>{post.content.substring(0, 225) + "..."}</chakra.p>
        </Box>

        <Box mt={4}>
          <Flex alignItems="center">
            <Flex alignItems="center" justify="between">
              <Image
                h={10}
                fit="cover"
                rounded="full"
                src="https://source.unsplash.com/random/48x48"
                alt="Avatar"
              />
            </Flex>
            <Spacer />
            <chakra.span>{convertRelativeTime(post.createdAt)}</chakra.span>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Post;
