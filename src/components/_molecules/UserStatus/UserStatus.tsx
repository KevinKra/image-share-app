import { useState, useContext, useEffect } from "react";
import { AccountContext, UserPool } from "../../../context/auth";

const UserStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { authenticate, getSession } = useContext(AccountContext);

  //   useEffect(() => {
  //     // const checkStatus = async () => {
  //     //   const status = await getSession().then((session) => {
  //     //     session !== undefined && setLoggedIn(true);
  //     //   });
  //     //   console.log({ status });
  //     // };
  //     // checkStatus();
  //     !!currentUser ? setLoggedIn(true) : setLoggedIn(false);
  //   }, [currentUser]);

  return (
    <div>
      {/* {loggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <p>Please sign in</p>
      )} */}
    </div>
  );
};

export default UserStatus;
