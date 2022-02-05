import type { NextPage } from "next";
import AWS from "aws-sdk";

AWS.config.region = "us-east-2"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-2:6fc7eebc-f732-4384-8041-a38f34178cb7",
});

const Home: NextPage = () => {
  return (
    <div>
      <p>hello world</p>
    </div>
  );
};

export default Home;
