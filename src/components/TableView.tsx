import type { GroupedFruitsProps } from "./types";
import { Box, Heading, Text, HStack, VStack, Button } from "@chakra-ui/react";
import { Collapsible } from "@ark-ui/react";
import { useEffect, useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const TableView: React.FC<GroupedFruitsProps> = ({
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
  }, [groupBy, groupedFruits]);
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
                    <Button>Add All</Button>
                    <Collapsible.Content>
                      <TableContainer>
                        <Table variant="striped" colorScheme="teal">
                          <TableCaption>Fruits grouped by {group}</TableCaption>
                          <Thead>
                            <Tr>
                              <Th>Family</Th>
                              <Th>Order</Th>
                              <Th>Genus</Th>
                              <Th>Cals</Th>
                              <Th>Add to Jar</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {fruits.map((fruit) => {
                              return (
                                <Tr>
                                  <Td flex={1}>{fruit.name}</Td>
                                  <Td flex={1}>{fruit.family}</Td>
                                  <Td flex={1}>{fruit.genus}</Td>
                                  <Td flex={1}>{fruit.nutritions.calories}</Td>
                                  <Td flex={1}>
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
                                  </Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </VStack>
              </Box>
            );
          })}
        </Box>
      )}
      {!isGrouped && (
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Family</Th>
                <Th>Order</Th>
                <Th>Genus</Th>
                <Th>Cals</Th>
                <Th>Add to Jar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {groupedFruits["none"].map((fruit) => {
                return (
                  <Tr>
                    <Td flex={1}>{fruit.name}</Td>
                    <Td flex={1}>{fruit.family}</Td>
                    <Td flex={1}>{fruit.genus}</Td>
                    <Td flex={1}>{fruit.nutritions.calories}</Td>
                    <Td flex={1}>
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
                            onClick={() => handleQuantityDecrement(fruit.id)}
                          >
                            -
                          </Button>
                          <Box>{quantities[fruit.id]}</Box>
                          <Button
                            onClick={() => handleQuantityIncrement(fruit.id)}
                          >
                            +
                          </Button>
                        </HStack>
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TableView;
