import React from 'react';
import { ChakraProvider, Container, Heading } from '@chakra-ui/react';
import './App.css';
import GeoJSON from './components/GeoJSON/GeoJSON';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Container maxW="container.xl">
          <Heading>Get GeoJSON features</Heading>
          <GeoJSON />
        </Container>
      </ChakraProvider>
    </div>
  );
}

export default App;
