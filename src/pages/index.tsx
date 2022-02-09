import type { NextPage } from "next";
import { useState, useContext } from "react";
import {
  useAuth,
  AuthProvider,
  UserPool,
  confirmUser,
  logout,
} from "../context/auth";
import ContentUploader from "../components/_molecules/ContentUploader/ContentUploader";
import ImageCollection from "../components/_molecules/ImageCollection/ImageCollection";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import UserStatus from "../components/_molecules/UserStatus/UserStatus";

// * cognito identity pool is configured
// * guest (unauth) users are able to upload images
// * can get images (flat-level) from s3

// todo - bucket is currently fully public, look into signedURLs ? (403 forbidden error)
// todo - set up logic to set images/objects to folder, make readable
// todo - signed in users / auth iam configure

// 1 - remove s3 put permission from guest users
// 2 - test if guest user can no longer upload
// 3 - test if signed in user can upload (config iam permissions if needed)
// 4 - test that after signed in user logs off, they cannot still upload
// 5 - setup buckets to have user uuid folders
// 6 - GET/READ/DELETE objects to new uuid-based folders
// 7 - Experiment with cognito-apiGateway auth routes
// 8 - Configure SSR rendering (no more login flicker)

const Home: NextPage = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    code: "",
  });

  const { authenticate, logoutUser, getSession, currentUser } = useAuth();

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
      </form>
      <div>
        {currentUser ? (
          <button onClick={logoutUser}>Logout</button>
        ) : (
          <>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
          </>
        )}
      </div>
      <input
        placeholder="email"
        type="email"
        name="email"
        onChange={(e) => handleInput(e)}
      ></input>
      <input
        placeholder="code"
        name="code"
        onChange={(e) => handleInput(e)}
      ></input>
      <button onClick={() => confirmUser(inputValues.email, inputValues.code)}>
        Confirm Account
      </button>
      <ContentUploader />
      <ImageCollection />
    </div>
  );
};

export default Home;
