import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <ProfileWrapper>
      <ProfileImage />
      <ProfileInfo />
      <ProfileCollections>
        <CollectionBookmark>
          <BookmarkImage />
          <BookmarkTitle>Vintage</BookmarkTitle>
        </CollectionBookmark>
        <CollectionBookmark>
          <BookmarkImage />
          <BookmarkTitle>Household</BookmarkTitle>
        </CollectionBookmark>
      </ProfileCollections>
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled("div")`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 150px;
  border: 1px solid red;
  height: 400px;
`;

const ProfileImage = styled("div")`
  border: 1px solid blue;
  height: 155px;
  width: 155px;
  border-radius: 50%;
  margin: 1rem;
`;

const ProfileInfo = styled("div")`
  border: 1px solid green;
  margin: 1.5rem;
`;

const ProfileCollections = styled("div")`
  display: flex;
  grid-column: 1/3;
  grid-row: 2/3;
  align-items: center;
  border: 1px dashed black;
`;

const CollectionBookmark = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  padding: 0.5rem;
  margin: 0 0.5rem;
`;
const BookmarkImage = styled("div")`
  border: 1px solid gray;
  height: 85px;
  width: 85px;
  border-radius: 50%;
`;
const BookmarkTitle = styled(Typography)`
  border: 1px solid green;
`;
