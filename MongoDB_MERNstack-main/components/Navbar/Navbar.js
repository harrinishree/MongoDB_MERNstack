import React, { useContext, useEffect } from "react";
import { AppBar, Typography, Avatar, Toolbar, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import Logo from "../../images/Logo.png";
import LogoText from "../../images/LogoText.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/authContext.js";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // This useEffect triggers whenever the location (URL) changes, and the app check to see if
  // the auth token is still valid, if not it logs the user out.
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "null"
    ) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));

      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
        navigate("/");
      }
    }
  }, [location]);

  // Logout and navigate back to home page
  const onlogout = async () => {
    logout();

    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <AppBar
      sx={{
        borderRadius: "15px",
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      position="static"
      color="inherit"
    >
      <Link to="/" className={styles.brandContainer}>
        <img src={LogoText} alt="icon" height="50px" />
        <img className={styles.image} src={Logo} alt="icon" height="50px" />
      </Link>
      <Toolbar className={styles.toolbar}>
        {user ? (
          <div className={styles.profile}>
            <Avatar
              onClick={handleProfile}
              style={{ cursor: "pointer" }}
              className={styles.purple}
              alt={user.name}
              src={user.pfp}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Typography
              onClick={handleProfile}
              style={{ cursor: "pointer" }}
              className={styles.userName}
              variant="h6"
            >
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={styles.logout}
              color="secondary"
              onClick={onlogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
