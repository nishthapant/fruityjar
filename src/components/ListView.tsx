import type { GroupedFruitsProps } from "./types";
import { Box, Heading, Text, HStack, VStack, Button } from "@chakra-ui/react";
import { Collapsible } from "@ark-ui/react";
import { useEffect, useState } from "react";

const ListView: React.FC<GroupedFruitsProps> = ({
  groupedFruits,
  groupBy,
  quantities,
  onQuantityChange,
}) => {
  const [isGrouped, setIsGrouped] = useState(true);

  useEffect(() => {
    if (groupBy != "None") {
      setIsGrouped(true);
    } else {
      setIsGrouped(false);
    }
  }, [groupBy, quantities]);

  const handleQuantityIncrement = (fruitId: number) => {
    onQuantityChange("increase", fruitId);
  };

  const handleQuantityDecrement = (fruitId: number) => {
    onQuantityChange("decrease", fruitId);
  };

  return (
    <>
      {isGrouped && (
        <Box>
          {Object.entries(groupedFruits).map(([group, fruits]) => {
            return (
              <Box>
                <VStack>
                  <Collapsible.Root>
                    <Collapsible.Trigger>
                      <Heading>{group}</Heading>
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                      <HStack spacing={3}>
                        <Text flex={1}>Name</Text>
                        <Text flex={1}>Calories</Text>
                        <Box flex={1}>Add to Jar</Box>
                      </HStack>
                      {fruits.map((fruit) => {
                        return (
                          <HStack spacing={3}>
                            <Box flex={1}>{fruit.name}</Box>
                            <Box flex={1}>{fruit.nutritions.calories}</Box>
                            {quantities[fruit.id] === 0 && (
                              <Button
                                onClick={() => {
                                  handleQuantityIncrement(fruit.id);
                                }}
                              >
                                Add
                              </Button>
                            )}
                            {quantities[fruit.id] !== 0 && (
                              <HStack>
                                <Button
                                  onClick={() =>
                                    handleQuantityDecrement(fruit.id)
                                  }
                                >
                                  -
                                </Button>
                                <Box>{quantities[fruit.id]}</Box>
                                <Button
                                  onClick={() =>
                                    handleQuantityIncrement(fruit.id)
                                  }
                                >
                                  +
                                </Button>
                              </HStack>
                            )}
                          </HStack>
                        );
                      })}
                    </Collapsible.Content>
                  </Collapsible.Root>
                </VStack>
              </Box>
            );
          })}
        </Box>
      )}
      {!isGrouped && (
        <Box>
          <VStack>
            <HStack spacing={3}>
              <Text flex={1}>Name</Text>
              <Text flex={1}>Calories</Text>
              <Box flex={1}>Add to Jar</Box>
            </HStack>
            {groupedFruits["none"].map((fruit) => {
              return (
                <HStack spacing={3}>
                  <Box flex={1}>{fruit.name}</Box>
                  <Box flex={1}>{fruit.nutritions.calories}</Box>
                  {quantities[fruit.id] === 0 && (
                    <Button onClick={() => handleQuantityIncrement(fruit.id)}>
                      Add
                    </Button>
                  )}
                  {quantities[fruit.id] !== 0 && (
                    <HStack>
                      <Button onClick={() => handleQuantityDecrement(fruit.id)}>
                        -
                      </Button>
                      <Box>{quantities[fruit.id]}</Box>
                      <Button onClick={() => handleQuantityIncrement(fruit.id)}>
                        +
                      </Button>
                    </HStack>
                  )}
                </HStack>
              );
            })}
          </VStack>
        </Box>
      )}
    </>
  );
};

export default ListView;
