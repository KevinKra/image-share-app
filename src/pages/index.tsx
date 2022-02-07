import type { NextPage } from "next";
import { useState, useContext } from "react";
import { AccountContext, Account, UserPool } from "../context/auth";
import ContentUploader from "../components/_molecules/ContentUploader/ContentUploader";
import ImageCollection from "../components/_molecules/ImageCollection/ImageCollection";
import { CognitoUserPool } from "amazon-cognito-identity-js";

// * cognito identity pool is configured
// * guest (unauth) users are able to upload images
// * can get images (flat-level) from s3

// todo - bucket is currently fully public, look into signedURLs ? (403 forbidden error)
// todo - set up logic to set images/objects to folder, make readable
// todo - signed in users / auth iam configure

const Home: NextPage = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const { authenticate } = useContext(AccountContext);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    const { email, password } = inputValues;

    try {
      const response = authenticate(email, password);
      console.log("auth response", response);
    } catch (err) {
      console.log("auth error", err);
    }
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    const { email, password } = inputValues;

    UserPool.signUp(email, password, [], [], (err, data) => {
      if (err) return console.log(err);
      console.log(data);
    });
  };

  return (
    <div>
      <Account>
        <form>
          <input
            placeholder="email"
            type="email"
            name="email"
            onChange={(e) => handleInput(e)}
          ></input>
          <input
            placeholder="password"
            type="password"
            name="password"
            onChange={(e) => handleInput(e)}
          ></input>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </form>
      </Account>
      <ContentUploader />
      <ImageCollection />
    </div>
  );
};

export default Home;
