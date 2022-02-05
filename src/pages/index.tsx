import type { NextPage } from "next";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { S3, ListObjectsCommand } from "@aws-sdk/client-s3";

const credentials = fromCognitoIdentityPool({
  identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || "",
  clientConfig: { region: "us-east-2" },
});

const albumBucket = "kkrato-image-share";

const client = new S3({
  region: "us-east-2",
  credentials,
});

const getBucketObjects = async () => {
  const command = new ListObjectsCommand({
    Bucket: albumBucket,
  });

  try {
    const response = await client.send(command);
    console.log("res", response);
  } catch (error) {
    console.log("error", error);
  }
};

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
