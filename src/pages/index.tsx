import type { NextPage } from "next";
import ContentUploader from "../components/_molecules/ContentUploader/ContentUploader";
import { getBucketObjects } from "../utils/aws";

const Home: NextPage = () => {
  const onClick = () => {
    getBucketObjects();
  };

  return (
    <div>
      <p>hello world</p>
      <button onClick={onClick}>click me</button>
      <ContentUploader />
    </div>
  );
};

export default Home;
