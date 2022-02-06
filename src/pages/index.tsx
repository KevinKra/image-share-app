import type { NextPage } from "next";
import ContentUploader from "../components/_molecules/ContentUploader/ContentUploader";
import ImageCollection from "../components/_molecules/ImageCollection/ImageCollection";

// * cognito identity pool is configured
// * guest (unauth) users are able to upload images
// * can get images (flat-level) from s3

// todo - bucket is currently fully public, look into signedURLs ? (403 forbidden error)
// todo - set up logic to set images/objects to folder, make readable
// todo - signed in users / auth iam configure

const Home: NextPage = () => {
  return (
    <div>
      <p>hello world</p>
      <ContentUploader />
      <ImageCollection />
    </div>
  );
};

export default Home;
