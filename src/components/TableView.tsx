import type { GroupedFruitsProps } from "./types";
import { Box, Heading, Text, HStack, VStack, Button } from "@chakra-ui/react";
import { Collapsible } from "@ark-ui/react";
import { useEffect, useState } from "react";
import { style } from "../styles/TableView.styles";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
              <Box mb={1}>
                <VStack {...style.collapsibleGroup}>
                  <Collapsible.Root>
                    <Collapsible.Trigger asChild>
                      <HStack>
                        <ChevronDownIcon />
                        <Heading {...style.collapsibleHeading}>{group}</Heading>
                      </HStack>
                    </Collapsible.Trigger>
                    {/* <Button>Add All</Button> */}
                    <Collapsible.Content>
                      <TableContainer>
                        <Table variant="striped" colorScheme="gray">
                          <TableCaption>
                            Fruits grouped by {groupBy}
                          </TableCaption>
                          <Thead>
                            <Tr>
                              <Th {...style.tableHeading}>Family</Th>
                              <Th {...style.tableHeading}>Order</Th>
                              <Th {...style.tableHeading}>Genus</Th>
                              <Th {...style.tableHeading}>Cals</Th>
                              <Th {...style.tableHeading}>Add to Jar</Th>
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
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th {...style.tableHeading}>Family</Th>
                <Th {...style.tableHeading}>Order</Th>
                <Th {...style.tableHeading}>Genus</Th>
                <Th {...style.tableHeading}>Cals</Th>
                <Th {...style.tableHeading}>Add to Jar</Th>
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
