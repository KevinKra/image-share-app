import type { NextPage } from "next";
import { getBucketObjects } from "../utils/aws";

const Home: NextPage = () => {
  const onClick = () => {
    getBucketObjects();
  };

  return (
    <div>
      <p>hello world</p>
      <button onClick={onClick}>click me</button>
    </div>
  );
};

export default Home;
