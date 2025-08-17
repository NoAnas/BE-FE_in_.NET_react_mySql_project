import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { handleLogin, getItems } from "./store/items";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setIsLoggedIn(true);
  }
}, []);

  useEffect(() => {
    handleLogin(setIsLoggedIn);
  }, []);

  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route
            path="/create"
            element={<CreatePage isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/signup"
            element={<Signup setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </Box>
    </>
  );
}

export default App;
