import {
  User,
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import logo from "../assets/img/logo.png"

function Header({ user }: { user: User | null }) {
  const auth = getAuth()

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log("Google login successful", user)
    } catch (error) {
      console.error("Google login error", error)
    }
  }

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#f5f3f1" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              sx={{
                height: 56,
                paddingRight: 2,
              }}
              alt="Your logo."
              src={logo}
            />
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Rubik",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "#ffa94d",
                textDecoration: "none",
              }}
            >
              Socratest
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "#ffa94d",
                textDecoration: "none",
                marginRight: 10,
              }}
            >Questions Unlimited</Typography>
            {!user ? (
              <Button
                sx={{ marginLeft: "auto", color: "#ffa94d" }}
                className="auth-button"
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button>
            ) : (
              <Button
                sx={{ marginLeft: "auto", color: "#ffa94d" }}
                className="auth-button"
                onClick={() => signOut(auth)}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Header
