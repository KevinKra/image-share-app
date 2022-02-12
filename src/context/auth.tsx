import { createContext, useContext, useEffect, useState } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import * as AWS from "aws-sdk/global";
import { S3Client } from "@aws-sdk/client-s3";

interface IAuthContext {
  authenticate: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  getSession: () => Promise<void>;
  currentUser: CognitoUserSession | null;
}

export let s3Client: S3Client;

const identityPoolId = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string;
const userPoolId = process.env.NEXT_PUBLIC_USER_POOL_ID as string;
const userPoolClientId = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const poolRegion = process.env.NEXT_PUBLIC_AWS_REGION as string;

export const poolData = {
  UserPoolId: userPoolId,
  ClientId: userPoolClientId,
};
export const UserPool = new CognitoUserPool(poolData);

export const confirmUser = (email: string, registrationCode: string) => {
  const user = new CognitoUser({
    Username: email,
    Pool: UserPool,
  });

  user.confirmRegistration(registrationCode, true, (err, result) => {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    console.log("call result: " + result);
  });
};

const getSession = async () => {
  try {
    const currentUser = await UserPool.getCurrentUser();
    return currentUser?.getSession((err: any, session: any) => {
      if (err) {
        console.log("error", err);
        return err;
      }
      return session;
    });
  } catch (err) {
    console.log("error", err);
  }
};

const getGuestCredentials = () => {
  return fromCognitoIdentityPool({
    identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string,
    clientConfig: { region: process.env.NEXT_PUBLIC_AWS_REGION },
  });
};

const getUserCredentials = (userSession: CognitoUserSession) => {
  const userPoolId = process.env.NEXT_PUBLIC_USER_POOL_ID as string;
  const poolRegion = process.env.NEXT_PUBLIC_AWS_REGION as string;
  const loginDetails = `cognito-idp.${poolRegion}.amazonaws.com/${userPoolId}`;
  const userIdToken = userSession.getIdToken().getJwtToken();

  return fromCognitoIdentityPool({
    identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string,
    clientConfig: { region: process.env.NEXT_PUBLIC_AWS_REGION },
    logins: {
      [loginDetails]: userIdToken,
    },
  });
};

const connectUserToS3 = (userSession?: CognitoUserSession) => {
  const authCredentials = userSession && getUserCredentials(userSession);
  const unAuthCredentials = getGuestCredentials();

  userSession
    ? console.log("authCredentials s3Client set")
    : console.log("guest s3Client set");

  return new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: userSession ? authCredentials : unAuthCredentials,
  });
};

// * context related code
const AuthContext = createContext<IAuthContext | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<CognitoUserSession | null>(
    null
  );

  useEffect(() => {
    const checkForUserSession = async () => {
      console.log("checkForUserSession");
      const currentUser = await UserPool.getCurrentUser();
      return currentUser?.getSession(
        (err: any, session: CognitoUserSession) => {
          if (err) {
            console.log("checkForUserSession Err:", err);
            return err;
          }
          s3Client = connectUserToS3(session);
          setCurrentUser(session);
        }
      );
    };
    s3Client = connectUserToS3();
    checkForUserSession();
  }, []);

  const authenticate = async (email: string, password: string) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (userSession) => {
          console.log("onSuccess", userSession);
          // AWS.config.region = poolRegion;

          setCurrentUser(userSession);
          s3Client = connectUserToS3(userSession);

          console.log("AWS.config", AWS.config);
        },
        onFailure: (err) => {
          console.log("onFailure", err);
          reject(err);
          setCurrentUser(null);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired:", data);
          resolve(data);
        },
      });
    });
  };

  const logoutUser = async () => {
    const user = UserPool.getCurrentUser();
    console.log("a", user);
    if (user !== null) {
      console.log("b", user);
      await user.signOut();
      setCurrentUser(null);
    }
    console.log("current user", user);
  };

  return (
    <AuthContext.Provider
      value={{ authenticate, logoutUser, getSession, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
