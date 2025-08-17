import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { createItem } from "../store/items";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  async function handleSubmit() {
    await createItem(formData);
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <Container maxW={"container.sm"}>
      <VStack>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create new Item
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack>
            <Input
              type="text"
              placeholder="Product Name"
              name="name"
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Image URL"
              name="image"
              onChange={handleChange}
              required
            />
            <Link
              to={"/"}
              w={"full"}
              onClick={handleSubmit}
              style={{
                padding: "6px 4rem",
                backgroundColor: "#2f85cf",
                borderRadius: "10px",
              }}
            >
              Add Item
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
