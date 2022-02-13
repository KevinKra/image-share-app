import type { NextPage } from "next";
import Profile from "../components/_molecules/Profile/Profile";
import styled from "@emotion/styled";
import PicturesCollection from "../components/_molecules/PicturesCollection/PicturesCollection";

// - users can get image from user-unique s3 subfolder
// - users can post image to user-unique s3 subfolder
// - users can delete image in user-unique s3 subfolder
// - on image upload, write lambda to create smaller versions and save in subfolder
// - setup bucket to be private, confirm can still access
// - rebuild identity-pool/user-pool with name, nickname, email -- no user key

const Home: NextPage = () => {
  return (
    <PageWrapper>
      <Profile />
      <PicturesCollection />
    </PageWrapper>
  );
};

export default Home;

const PageWrapper = styled("div")`
  border: 1px solid red;
  min-height: 100vh;
  width: 80vw;
  max-width: 925px;
  margin: 0 auto;
`;
