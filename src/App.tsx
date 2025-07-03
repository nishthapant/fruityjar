import { useState, useEffect } from "react";
import "./App.css";
import { style } from "./styles/App.styles";
import FruitView from "./components/FruitView";
import Controls from "./components/Controls";
import {
  Box,
  Heading,
  Container,
  HStack,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import type { Fruit } from "./components/types";
import JarView from "./components/JarView";
import { Apple } from "lucide-react";

function App() {
  const [fruits, setFruits] = useState([]);
  const [isloading, setIsLoading] = useState(true);
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
    const fetchAllFruits = async () => {
      try {
        // const response = await fetch(
        //   "https://fruity-proxy.vercel.app/api/fruits",
        //   {
        //     headers: {
        //       "x-api-key": "fruit-api-challenge-2025",
        //     },
        //   }
        // );
        const response = await fetch("/api/fruity");

        const data = await response.json();

        setFruits(data);

        const initialQuantity: Record<number, number> = {};

        data.forEach((fruit: Fruit) => {
          initialQuantity[fruit.id] = 0;
        });

        setQuantities(initialQuantity);
      } catch (error: any) {
        console.error("Fetch failed: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllFruits();
  }, []);

  useEffect(() => {
    const updatedSeletedFruits = fruits.filter((fruit: Fruit) => {
      return quantities[fruit.id] && quantities[fruit.id] > 0;
    });
    setSelectedFruits(updatedSeletedFruits);
  }, [quantities, fruits]);

  return (
    <Container {...style.outerContainer}>
      <VStack spacing={2} minW="100%" minH="100%">
        <HStack spacing={2}>
          <Heading color="#19456B" flex={1}>
            Fruity Jar
          </Heading>
          <Apple size="24" />
        </HStack>
        {isloading ? (
          <Box p={4}>
            <Spinner size="xl" color="blue.400" />
          </Box>
        ) : (
          <HStack flex={1} spacing={2} minW="100%" alignItems="stretch">
            <VStack {...style.vstack}>
              <Box display="flex" justifyContent="flex-end" w="100%" p={2}>
                <HStack spacing={2}>
                  <Box flex={1}>
                    <Heading fontSize="lg" color="#19456B">
                      Filters:
                    </Heading>
                  </Box>
                  <Box flex={1}>
                    <Controls onControlsChange={handleControlChange} />
                  </Box>
                </HStack>
              </Box>
              <Container flex={1} p={0}>
                <FruitView
                  fruits={fruits}
                  groupBy={controls.groupBy}
                  viewType={controls.viewType}
                  quantities={quantities}
                  onQuantityChange={handleQuantityChange}
                />
              </Container>
            </VStack>
            <Container {...style.jarContainer}>
              <JarView
                selectedFruits={selectedFruits}
                quantities={quantities}
              />
            </Container>
          </HStack>
        )}
      </VStack>
    </Container>
  );
}

export default App;
