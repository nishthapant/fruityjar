import { useState, useEffect } from "react";

import {
  Box,
  Heading,
  Text,
  Container,
  HStack,
  Collapse,
} from "@chakra-ui/react";
import ListView from "./ListView";
import TableView from "./TableView";
import type { GroupBySelection, FruitViewProps, Fruit } from "./types";

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
    let groups: Record<string, Fruit[]> = {};
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
  }, [fruits, groupBy]);

  return (
    <Container>
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
    </Container>
  );
};

export default FruitView;
