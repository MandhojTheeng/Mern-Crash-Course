import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const [message, setMessage] = useState(""); // For displaying feedback
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    setMessage(message);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        position: "top-right",
        isClosable: true,
      });
    }

    if (success) {
      // Clear the form fields on success
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Creating New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Product Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              colorScheme={useColorModeValue("pink", "purple")}
              onClick={handleAddProduct}
              w="full"
            >
              Add Product
            </Button>
            {message && (
              <Text
                mt={4}
                color={
                  message.includes("successfully") ? "green.500" : "red.500"
                }
              >
                {message}
              </Text>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
