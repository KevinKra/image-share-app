import { createContext } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

export const poolData = {
  UserPoolId: "us-east-2_H7eduuY2p",
  ClientId: "19kum86vl53kl04s5cvpttmlmc",
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

export const logout = () => {
  const user = UserPool.getCurrentUser();
  console.log("logout", user);
  if (user) {
    user.signOut();
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

let currentUser = UserPool.getCurrentUser();

interface IAccountContext {
  authenticate: (email: string, password: string) => Promise<void>;
  getSession: () => Promise<void>;
  currentUser: CognitoUser | null;
}

const AccountContext = createContext<IAccountContext>({
  authenticate,
  getSession,
  currentUser,
});

const Account = (props: any) => {
  return (
    <AccountContext.Provider value={{ authenticate, getSession, currentUser }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
