import type { GroupedFruitsProps, Fruit } from "./types";
import {
  Box,
  Heading,
  HStack,
  VStack,
  Button,
  Container,
} from "@chakra-ui/react";
import { Collapsible } from "@ark-ui/react";
import { useEffect, useState } from "react";
import { style } from "../styles/ListView.styles";
import { ChevronDownIcon } from "@chakra-ui/icons";

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

  const handleAddAll = (fruits: Fruit[]) => {
    fruits.forEach((fruit) => {
      return handleQuantityIncrement(fruit.id);
    });
  };

  return (
    <>
      {isGrouped && (
        <Box>
          {Object.entries(groupedFruits).map(([group, fruits]) => {
            return (
              <Box p={1}>
                <VStack {...style.collapsibleGroup}>
                  <Collapsible.Root>
                    <Collapsible.Trigger asChild>
                      <HStack spacing={3}>
                        <Box
                          flex={0.2}
                          display="flex"
                          justifyContent="flex-start"
                          pl={2}
                        >
                          <ChevronDownIcon />
                        </Box>
                        <Box
                          flex={1}
                          display="flex"
                          justifyContent="flex-start"
                        >
                          <Heading {...style.collapsibleHeading}>
                            {group}
                          </Heading>
                        </Box>
                        <Box
                          flex={1}
                          display="flex"
                          justifyContent="flex-end"
                          pr={2}
                        >
                          <Button
                            {...style.addButton}
                            onClick={() => handleAddAll(fruits)}
                          >
                            Add all
                          </Button>
                        </Box>
                      </HStack>
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                      <HStack spacing={3} {...style.headingStack}>
                        <Heading {...style.listHeading}>Name</Heading>
                        <Heading {...style.listHeading}>Calories</Heading>
                        <Heading {...style.listHeading} textAlign="left">
                          Add to Jar
                        </Heading>
                      </HStack>
                      {fruits.map((fruit) => {
                        return (
                          <HStack {...style.fruitList}>
                            <Box flex={1}>{fruit.name}</Box>
                            <Box flex={1}>{fruit.nutritions.calories}</Box>
                            <Box flex={1} textAlign="left" paddingLeft="8">
                              {quantities[fruit.id] === 0 && (
                                <Button
                                  {...style.addButton}
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
                                    {...style.addButton}
                                    onClick={() =>
                                      handleQuantityDecrement(fruit.id)
                                    }
                                  >
                                    -
                                  </Button>
                                  <Box>{quantities[fruit.id]}</Box>
                                  <Button
                                    {...style.addButton}
                                    onClick={() =>
                                      handleQuantityIncrement(fruit.id)
                                    }
                                  >
                                    +
                                  </Button>
                                </HStack>
                              )}
                            </Box>
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
        <Container minW="full" p={0}>
          <VStack minW="100%">
            <HStack spacing={3} {...style.headingStack}>
              <Heading {...style.listHeading}>Name</Heading>
              <Heading {...style.listHeading}>Calories</Heading>
              <Heading {...style.listHeading} textAlign="left">
                Add to Jar
              </Heading>
            </HStack>
            <Box minW="full">
              {groupedFruits["none"].map((fruit) => {
                return (
                  <HStack spacing={3} {...style.fruitList}>
                    <Box flex={1} p={2}>
                      {fruit.name}
                    </Box>
                    <Box flex={1}>{fruit.nutritions.calories}</Box>
                    <Box flex={1} textAlign="left" paddingLeft="8">
                      {quantities[fruit.id] === 0 && (
                        <Button
                          onClick={() => handleQuantityIncrement(fruit.id)}
                          {...style.addButton}
                        >
                          Add
                        </Button>
                      )}
                      {quantities[fruit.id] !== 0 && (
                        <HStack>
                          <Button
                            {...style.addButton}
                            onClick={() => handleQuantityDecrement(fruit.id)}
                          >
                            -
                          </Button>
                          <Box>{quantities[fruit.id]}</Box>
                          <Button
                            {...style.addButton}
                            onClick={() => handleQuantityIncrement(fruit.id)}
                          >
                            +
                          </Button>
                        </HStack>
                      )}
                    </Box>
                  </HStack>
                );
              })}
            </Box>
          </VStack>
        </Container>
      )}
    </>
  );
};

export default ListView;
