import { useState, useContext, useEffect } from "react";
import { AccountContext } from "../../../context/auth";

const UserStatus = () => {
  const [status, setStatus] = useState(false);

  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      console.log({ session });
      // todo - not sound logic, errors not gracefully handled
      // todo - on fresh login, doenst detect and automatically change (yet)
      session !== undefined && setStatus(true);
    });
  }, [getSession]);

  return <div>{status ? <p>Logged In</p> : <p>Please Log in</p>}</div>;
};

export default UserStatus;
