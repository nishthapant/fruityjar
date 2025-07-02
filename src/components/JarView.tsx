import { Box, VStack, HStack } from "@chakra-ui/react";

import type { JarViewProps } from "./types";

const JarView: React.FC<JarViewProps> = ({ selectedFruits, quantities }) => {
  const totalCalories = selectedFruits.reduce((sum, fruit) => {
    return sum + fruit.nutritions.calories * quantities[fruit.id];
  }, 0);

  return (
    <>
      <VStack spacing={2}>
        <Box flex={1}>
          {selectedFruits.length > 0 &&
            selectedFruits.map((fruit) => {
              return (
                <>
                  <HStack spacing={4}>
                    <Box flex={1}>{fruit.name}</Box>
                    <Box flex={1}>{quantities[fruit.id]}</Box>
                    <Box flex={1}>{fruit.nutritions.calories}</Box>
                    <Box flex={1}>
                      {fruit.nutritions.calories * quantities[fruit.id]}
                    </Box>
                  </HStack>
                </>
              );
            })}
          {selectedFruits.length == 0 && <Box>Jar is Empty</Box>}
        </Box>
        <Box>Total calories: {totalCalories}</Box>
        <Box flex={1}>Pie chart here</Box>
      </VStack>
    </>
  );
};

export default JarView;
