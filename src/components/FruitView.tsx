import { useState, useEffect } from "react";

import { Box } from "@chakra-ui/react";
import ListView from "./ListView";
import TableView from "./TableView";
import type { GroupBySelection, FruitViewProps, Fruit } from "./types";
import { style } from "../styles/FruitView.styles";

const FruitView: React.FC<FruitViewProps> = ({
  fruits,
  groupBy,
  viewType,
  quantities,
  onQuantityChange,
}) => {
  const [groupedFruits, setGroupedFruits] = useState<Record<string, Fruit[]>>(
    {}
  );

  useEffect(() => {
    try {
      const groups: Record<string, Fruit[]> = {};
      const key = groupBy.toLowerCase() as GroupBySelection;

      if (key == "none") {
        setGroupedFruits({
          none: [...fruits],
        });
      } else {
        fruits.forEach((fruit) => {
          const group = fruit[key];
          if (!groups[group]) {
            groups[group] = [];
          }
          groups[group].push(fruit);
        });
        setGroupedFruits(groups);
      }
    } catch (error) {
      console.log("Grouping failed: ", error);
      setGroupedFruits({});
    }
  }, [fruits, groupBy]);

  return (
    <Box {...style.outerContainer}>
      {viewType == "List" && (
        <ListView
          groupedFruits={groupedFruits}
          groupBy={groupBy}
          quantities={quantities}
          onQuantityChange={onQuantityChange}
        />
      )}
      {viewType == "Table" && (
        <TableView
          groupedFruits={groupedFruits}
          groupBy={groupBy}
          quantities={quantities}
          onQuantityChange={onQuantityChange}
        />
      )}
    </Box>
  );
};

export default FruitView;
