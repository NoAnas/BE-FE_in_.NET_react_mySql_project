import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { deleteItem, editItem, getItems } from "../store/items";

const ItemCard = ({ item, setData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const [updateditem, setUpdatedItem] = useState({
    name: item.name,
    image: item.image,
  });
  const [itemId, setItemId] = useState(null);

  function handleEdit(id) {
    setItemId(id);
  }

  async function editedItem() {
    await editItem(updateditem, itemId, setData);
  }

  return (
    <>
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
      >
        <Image
          src={item.image}
          alt={item.name}
          h={48}
          w="full"
          objectFit="cover"
        />
        <Box p={4}>
          <Heading as="h3" size="md" mb={2}>
            {item.name}
          </Heading>
          <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              colorScheme="blue"
              onClick={() => {
                onOpen();
                handleEdit(item.id);
              }}
            />
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => {
                deleteItem(item.id, setData);
              }}
            />
          </HStack>
        </Box>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Item Name</FormLabel>
              <Input
                placeholder="Item Name"
                defaultValue={item.name}
                onChange={(e) => {
                  setUpdatedItem({ ...updateditem, name: e.target.value });
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Itme Image</FormLabel>
              <Input
                placeholder="Itme Image"
                defaultValue={item.image}
                onChange={(e) => {
                  setUpdatedItem({ ...updateditem, image: e.target.value });
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={async () => {
                await editedItem();
                onClose();
              }}
            >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ItemCard;
