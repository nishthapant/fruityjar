import { Box, VStack, HStack, Button } from "@chakra-ui/react";
import JarPieChart from "./JarPieChart";
import type { JarViewProps } from "./types";
import { useEffect, useState } from "react";

const JarView: React.FC<JarViewProps> = ({ selectedFruits, quantities }) => {
  const [pieChartData, setPieChartdata] = useState<Record<string, number>>({});
  const [viewPieChart, setViewPieChart] = useState(false);

  const totalCalories = selectedFruits.reduce((sum, fruit) => {
    return sum + fruit.nutritions.calories * quantities[fruit.id];
  }, 0);

  const handlePieChartView = () => {
    setViewPieChart(!viewPieChart);
  };

  useEffect(() => {
    let data: Record<string, number> = {};
    selectedFruits.forEach((fruit) => {
      data[fruit.name] = fruit.nutritions.calories * quantities[fruit.id];
    });
    setPieChartdata(data);
  }, [selectedFruits, quantities]);

  return (
    <>
      <VStack spacing={2}>
        <Box flex={1}>
          {selectedFruits.length > 0 &&
            selectedFruits.map((fruit) => {
              return (
                <>
                  <HStack key={fruit.id} spacing={4}>
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
        <Button onClick={handlePieChartView}>
          {viewPieChart == false ? "View pie chart" : "Close"}
        </Button>
        <Box flex={1}>
          {Object.keys(pieChartData).length > 0 && viewPieChart && (
            <JarPieChart data={pieChartData} />
          )}
        </Box>
      </VStack>
    </>
  );
};

export default JarView;
