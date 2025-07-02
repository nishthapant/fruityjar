import { useState, useEffect } from "react";
import "./App.css";
import FruitView from "./components/FruitView";
import Controls from "./components/Controls";
import {
  Box,
  Heading,
  Text,
  Container,
  HStack,
  VStack,
} from "@chakra-ui/react";
import type { Fruit } from "./components/types";
import JarView from "./components/JarView";

function App() {
  const [fruits, setFruits] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [controls, setControls] = useState({
    groupBy: "None",
    viewType: "List",
  });
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectedFruits, setSelectedFruits] = useState<Fruit[]>([]);

  const handleControlChange = (
    groupBy: string | string[],
    viewType: string | string[]
  ) => {
    setControls({
      viewType: Array.isArray(viewType) ? viewType[0] : viewType,
      groupBy: Array.isArray(groupBy) ? groupBy[0] : groupBy,
    });
  };

  const handleQuantityChange = (operation: string, fruitId: number) => {
    if (operation == "increase") {
      setQuantities((prev) => ({
        ...prev,
        [fruitId]: (prev[fruitId] || 0) + 1,
      }));
    } else if (operation == "decrease") {
      setQuantities((prev) => ({
        ...prev,
        [fruitId]: (prev[fruitId] || 0) - 1,
      }));
    }
  };

  useEffect(() => {
    fetch("https://fruity-proxy.vercel.app/api/fruits", {
      headers: {
        "x-api-key": "fruit-api-challenge-2025",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFruits(data);
        data.forEach((fruit: Fruit) => {
          setQuantities((prev) => ({
            ...prev,
            [fruit.id]: 0,
          }));
        });
        setIsLoading(true);
      });
  }, []);

  useEffect(() => {
    const updatedSeletedFruits = fruits.filter((fruit: Fruit) => {
      return quantities[fruit.id] && quantities[fruit.id] > 0;
    });
    console.log("selected fruits - ", selectedFruits);
    setSelectedFruits(updatedSeletedFruits);
  }, [quantities, fruits]);

  return (
    <Container minW="container.xl" py={2} border="2px solid red">
      <VStack spacing={2}>
        <Heading>Fruit Jar</Heading>
        <Controls onControlsChange={handleControlChange} />
        <HStack spacing={2}>
          {isloading && (
            <Container flex={1} border="2px solid green">
              <FruitView
                fruits={fruits}
                groupBy={controls.groupBy}
                viewType={controls.viewType}
                quantities={quantities}
                onQuantityChange={handleQuantityChange}
              />
            </Container>
          )}
          <Container flex={1} bgColor="red.200" border="2px solid blue">
            <JarView selectedFruits={selectedFruits} quantities={quantities} />
            {/* Jar space */}
          </Container>
        </HStack>
      </VStack>
    </Container>
  );
}

export default App;
