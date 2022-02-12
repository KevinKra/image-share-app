import type { NextPage } from "next";
import { useState, useContext, useEffect } from "react";
import { useAuth, AuthProvider, UserPool, confirmUser } from "../context/auth";
import ContentUploader from "../components/_molecules/ContentUploader/ContentUploader";
import ImageCollection from "../components/_molecules/ImageCollection/ImageCollection";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import UserStatus from "../components/_molecules/UserStatus/UserStatus";
import NavBar from "../components/_molecules/NavBar/NavBar";

// * cognito identity pool is configured
// * guest (unauth) users are able to upload images
// * can get images (flat-level) from s3

// todo - bucket is currently fully public, look into signedURLs ? (403 forbidden error)
// todo - set up logic to set images/objects to folder, make readable
// todo - signed in users / auth iam configure

// 1 - remove s3 put permission from guest users
// 1.1 - reassign creds to logged in user.
// 2 - test if guest user can no longer upload
// 3 - test if signed in user can upload (config iam permissions if needed)
// 4 - test that after signed in user logs off, they cannot still upload
// 5 - setup buckets to have user uuid folders
// 6 - GET/READ/DELETE objects to new uuid-based folders
// 7 - Experiment with cognito-apiGateway auth routes
// 8 - Configure SSR rendering (no more login flicker)

const Home: NextPage = () => {
  return <main>index</main>;
};

export default Home;
