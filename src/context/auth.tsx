import { createContext, useContext, useEffect, useState } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
// import { credentials, userLoggedIn } from "../utils/aws";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import * as AWS from "aws-sdk/global";
import { S3, S3Client } from "@aws-sdk/client-s3";

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
      const currentUser = await UserPool.getCurrentUser();
      return currentUser?.getSession((err: any, session: any) => {
        if (err) {
          console.log("error", err);
          return err;
        }
        setCurrentUser(session);
      });
    };
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
        onSuccess: (data) => {
          console.log("onSuccess", data);
          AWS.config.region = poolRegion;
          const loginDetails = `cognito-idp.${poolRegion}.amazonaws.com/${userPoolId}`;

          var accessToken = data.getAccessToken().getJwtToken();
          var idToken = data.getIdToken().getJwtToken();
          setCurrentUser(data);

          console.log({ idToken });

          // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          //   IdentityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string,
          //   Logins: { [loginDetails]: accessToken },
          // });

          const credentials = fromCognitoIdentityPool({
            // identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string,
            identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string,
            clientConfig: { region: process.env.NEXT_PUBLIC_AWS_REGION },
            logins: {
              // [userPoolId]: accessToken,
              [loginDetails]: idToken,
            },
          });

          console.log({ credentials });

          s3Client = new S3Client({
            region: process.env.NEXT_PUBLIC_AWS_REGION,
            credentials,
          });

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
