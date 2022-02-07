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

// const defaultState = {
//   authenticate: (name: string, password: string) => {},
// };

interface IAccountContext {
  authenticate: (email: string, password: string) => Promise<void>;
}

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

const AccountContext = createContext<IAccountContext>({ authenticate });

const Account = (props: any) => {
  return (
    <AccountContext.Provider value={{ authenticate }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
