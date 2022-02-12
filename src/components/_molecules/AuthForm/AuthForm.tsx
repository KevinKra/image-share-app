import React, { useEffect, useState } from "react";
import { useAuth, UserPool, confirmUser } from "../../../context/auth";
import ContentUploader from "../ContentUploader/ContentUploader";
import ImageCollection from "../ImageCollection/ImageCollection";

const AuthForm = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    code: "",
  });

  const { authenticate, logoutUser, getSession, currentUser } = useAuth();

  useEffect(() => {
    const getSess = async () => {
      const session = await getSession();
      const currentUser = await UserPool.getCurrentUser();

      console.log({ currentUser });
      console.log({ session });
    };
    getSess();
  }, [getSession]);

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

export default AuthForm;
