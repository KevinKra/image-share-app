import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../../context/auth";

const NavBar = () => {
  const { currentUser, logoutUser } = useAuth();

  return (
    <Wrapper>
      <Typography>{currentUser ? "user" : "Guest"}</Typography>
      {currentUser && <Button onClick={logoutUser}>Logout</Button>}
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.nav`
  display: grid;
  place-items: center;
  border: 1px solid red;
  width: 100%;
  height: 3rem;
`;

// const Button = styled.button<{ primary: boolean; }>`
//   color: ${(props) => (props.primary ? "hotpink" : "turquoise")};
// `;

// type ImageProps = {
//   width: number;
//   src: string;
// };

// const Image1 = styled("div")<ImageProps>(
//   {
//     backgroundSize: "contain",
//   },
//   (props) => ({
//     width: props.width,
//     background: `url(${props.src}) center center`,
//   })
// );
