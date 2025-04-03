import {
  Container,
  VStack,
  Text,
  useColorModeValue,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard"; // Import ProductCard

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products", products);

  const textGradient = useColorModeValue(
    "linear(to-r, gray.100, pink.100)", // Light theme
    "linear(to-r, gray.900, purple.800)" // Dark theme
  );

  const titleColor = useColorModeValue("black", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const linkColor = useColorModeValue("blue.600", "blue.300");

  return (
    <Container maxW="container.xl" py={16}>
      <VStack spacing={10} align="center">
        {/* Title with refined styling */}
        <Text
          fontSize="3xl"
          fontWeight="bold"
          bgGradient={textGradient}
          bgClip="text"
          textAlign="center"
          color={titleColor}
        >
          Current Products
        </Text>

        {/* Product Grid or Empty State */}
        {products.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={8}
            w="full"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" mt={8}>
            <Text fontSize="xl" fontWeight="medium" color={textColor}>
              No products found{" "}
              <Link to="/create">
                <Text
                  as="span"
                  fontWeight="bold"
                  color={linkColor}
                  _hover={{ textDecoration: "underline", opacity: 0.8 }}
                  transition="all 0.2s"
                >
                  Create a product
                </Text>
              </Link>
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
