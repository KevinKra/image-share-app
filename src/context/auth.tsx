import { createContext, useContext, useEffect, useState } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

export const poolData = {
  UserPoolId: "us-east-2_H7eduuY2p",
  ClientId: "19kum86vl53kl04s5cvpttmlmc",
};
export const UserPool = new CognitoUserPool(poolData);

interface IAuthContext {
  authenticate: (email: string, password: string) => Promise<void>;
  getSession: () => Promise<void>;
  // currentUser: CognitoUser | null;
}

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
        resolve(data);
      },
      onFailure: (err) => {
        console.log("onFailure", err);
        reject(err);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired:", data);
        resolve(data);
      },
    });
  });
};

export const logout = () => {
  const user = UserPool.getCurrentUser();
  console.log({ user });
  if (user) {
    console.log({ user });
    user.signOut();
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
  return (
    <AuthContext.Provider value={{ authenticate, getSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
