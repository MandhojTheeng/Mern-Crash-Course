import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  const bgGradient = useColorModeValue(
    "linear(to-r, gray.100, pink.100)", // Light theme
    "linear(to-r, gray.900, purple.800)" // Dark theme
  );

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      transition="background 0.3s ease-in-out"
      px={4}
    >
      <Navbar />
      <Box maxW="1200px" mx="auto" py={8}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
