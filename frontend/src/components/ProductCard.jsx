import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  Button,
  VStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.700", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { deleteProduct } = useProductStore();

  // Ensure valid image URL & fallback
  const imageSrc = product.image.startsWith("http")
    ? product.image
    : "https://via.placeholder.com/300?text=No+Image";

  const handleDeleteProduct = (pid) => {
    toast({
      title: "Are you sure?",
      description: "This action cannot be undone.",
      status: "warning",
      duration: 5000,
      position: "top-right",
      isClosable: true,
      render: ({ onClose }) => (
        <Box bg="gray.700" color="white" p={4} rounded="md" shadow="md">
          <VStack align="start">
            <Text fontWeight="bold">Are you sure?</Text>
            <Text fontSize="sm">This action cannot be undone.</Text>
            <HStack spacing={3} mt={2}>
              <Button
                colorScheme="red"
                size="sm"
                onClick={async () => {
                  const { success, message } = await deleteProduct(pid);
                  toast({
                    title: success ? "Deleted" : "Error",
                    description: message,
                    status: success ? "success" : "error",
                    duration: 3000,
                    position: "top-right",
                    isClosable: true,
                  });
                  onClose(); // Close the confirmation toast
                }}
              >
                Delete
              </Button>
              <Button size="sm" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </HStack>
          </VStack>
        </Box>
      ),
    });
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      p={4}
    >
      <Image
        src={imageSrc}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/300?text=Loading..."
      />
      <Box py={4}>
        <Heading as="h3" size="md" mb={2} color={textColor}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={3}>
          <IconButton
            icon={<EditIcon />}
            colorScheme="blue"
            aria-label="Edit Product"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
            aria-label="Delete Product"
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
