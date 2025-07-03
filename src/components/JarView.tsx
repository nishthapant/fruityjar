import { Box, VStack, HStack, Text, Heading } from "@chakra-ui/react";
import JarPieChart from "./JarPieChart";
import type { JarViewProps } from "./types";
import { useEffect, useState } from "react";
import { style } from "../styles/JarView.styles";

const JarView: React.FC<JarViewProps> = ({ selectedFruits, quantities }) => {
  const [pieChartData, setPieChartdata] = useState<Record<string, number>>({});

  const totalCalories = selectedFruits.reduce((sum, fruit) => {
    const qty = quantities[fruit.id] ?? 0;
    return sum + fruit.nutritions.calories * qty;
  }, 0);

  useEffect(() => {
    try {
      const data: Record<string, number> = {};
      selectedFruits.forEach((fruit) => {
        data[fruit.name] = fruit.nutritions.calories * quantities[fruit.id];
      });
      setPieChartdata(data);
    } catch (error) {
      console.log("Error updating pie chart");
    }
  }, [selectedFruits, quantities]);

  return (
    <Box {...style.outerContainer} h="100%">
      <VStack spacing={3} alignItems="stretch" h="100%">
        <Box>
          <Heading color="#19456B">Jar</Heading>
        </Box>
        <Box flex={1} {...style.jar}>
          <HStack spacing={3} {...style.headingStack}>
            <Heading {...style.listHeading}>Name</Heading>
            <Heading {...style.listHeading}>Cals/Unit</Heading>
            <Heading {...style.listHeading}>Qty</Heading>
            <Heading {...style.listHeading}>Cals</Heading>
          </HStack>
          {selectedFruits.length > 0 ? (
            selectedFruits.map((fruit) => {
              return (
                <>
                  <HStack key={fruit.id} spacing={4} {...style.fruitList}>
                    <Box flex={1}>{fruit.name}</Box>
                    <Box flex={1}>{fruit.nutritions.calories}</Box>
                    <Box flex={1}>{quantities[fruit.id]}</Box>
                    <Box flex={1}>
                      {fruit.nutritions.calories * quantities[fruit.id]}
                    </Box>
                  </HStack>
                </>
              );
            })
          ) : (
            <Box>Jar is empty</Box>
          )}
        </Box>
        <Box flex={0.2} display="flex" alignItems="center" mb={1}>
          <Heading {...style.total}>Total calories: {totalCalories}</Heading>
        </Box>
        <Box flex={1} {...style.chart}>
          {Object.keys(pieChartData).length > 0 ? (
            <Box
              flex={1.7}
              w="100%"
              display="flex"
              justifyContent="center"
              pb={4}
            >
              <JarPieChart data={pieChartData} />
            </Box>
          ) : (
            <Text>Add fruits to view chart</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default JarView;
