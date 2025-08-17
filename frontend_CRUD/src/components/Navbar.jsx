import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = ({ isLoggedIn }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        {isLoggedIn ? (
          <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
              <Button>
                <PlusSquareIcon fontSize={20} />
              </Button>
            </Link>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
            </Button>
          </HStack>
        ) : (
          <div
            className="links"
            style={{
              display: "flex",
              gap: "1rem",
              color: "#2e87d0",
              fontWeight: "500",
            }}
          >
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link>
          </div>
        )}
      </Flex>
    </Container>
  );
};

export default Navbar;
