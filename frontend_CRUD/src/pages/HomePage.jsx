import { Container, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getItems } from "../store/items";
import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";

const HomePage = ({ isLoggedIn }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getItems();
      setData(data);
    };
    getData();
  }, []);

  return (
    <Container maxW="container.xl" py={12}>
      {isLoggedIn ? (
        <VStack spacing={8}>
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
          >
            Current Products 🚀
          </Text>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            w={"full"}
          >
            {data.map((item) => (
              <ItemCard key={item.id} item={item} setData={setData} />
            ))}
          </SimpleGrid>
          {data.length === 0 && (
            <Text
              fontSize="xl"
              textAlign={"center"}
              fontWeight="bold"
              color="gray.500"
            >
              No products found 😢{" "}
              <Link to={"/create"}>
                <Text
                  as="span"
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                >
                  Create a product
                </Text>
              </Link>
            </Text>
          )}
        </VStack>
      ) : (
        <h1>Hi!</h1>
      )}
    </Container>
  );
};

export default HomePage;
