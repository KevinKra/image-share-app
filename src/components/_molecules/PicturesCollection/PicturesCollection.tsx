import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React from "react";

const PicturesCollection = () => {
  return (
    <Wrapper>
      <CollectionNavigator>
        <Typography>Posts</Typography>
        <Typography>Reels</Typography>
        <Typography>Videos</Typography>
        <Typography>Tagged</Typography>
      </CollectionNavigator>
      <MediaContainer>
        <PhotoThumbnail src="http://via.placeholder.com/293x293" />
        <PhotoThumbnail src="http://via.placeholder.com/293x293" />
        <PhotoThumbnail src="http://via.placeholder.com/293x293" />
        <PhotoThumbnail src="http://via.placeholder.com/293x293" />
        <PhotoThumbnail src="http://via.placeholder.com/293x293" />
        <PhotoThumbnail src="http://via.placeholder.com/293x293" />
        <PhotoThumbnail src="http://via.placeholder.com/293x293" />
        <PhotoThumbnail src="http://via.placeholder.com/293x293" />
        <PhotoThumbnail src="http://via.placeholder.com/293x293" />
      </MediaContainer>
    </Wrapper>
  );
};

export default PicturesCollection;

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  border: 1px dashed blue;
  /* height: 100%; */
`;

const CollectionNavigator = styled("nav")`
  border: 1px solid red;
  display: flex;
  justify-content: center;

  > p {
    margin: 1rem;
  }
`;

const PhotoThumbnail = styled.img`
  border: 1px solid black;
`;

const MediaContainer = styled("section")`
  border: 1px solid green;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  ${PhotoThumbnail} {
    width: 100%;
  }
`;
