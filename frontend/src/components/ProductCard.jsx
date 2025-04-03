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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.700", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { deleteProduct, updateProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState(product);

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

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (success) {
      toast({
        title: "Product Updated",
        description: message,
        status: "success",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
    onClose(); // Close the modal after updating
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
            onClick={onOpen}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
