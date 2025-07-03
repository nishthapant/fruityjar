import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";

type ControlProps = {
  onControlsChange: (group: string | string[], view: string | string[]) => void;
};

const Controls: React.FC<ControlProps> = ({ onControlsChange }) => {
  const [groupBy, setGroupBy] = useState("None");
  const [viewType, setViewType] = useState("List");

  const handleGroupBy = (group: string | string[]) => {
    const newGroup = group as string;
    setGroupBy(newGroup as string);
    onControlsChange(newGroup, viewType);
  };

  const handleViewType = (view: string | string[]) => {
    const newView = view as string;
    setViewType(newView as string);
    onControlsChange(groupBy, newView);
  };

  return (
    <HStack spacing={2}>
      <Box flex={1}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Text fontSize="sm">Group By: {groupBy}</Text>
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              defaultValue="None"
              type="radio"
              onChange={handleGroupBy}
            >
              <MenuItemOption value="None">None</MenuItemOption>
              <MenuItemOption value="Family">Family</MenuItemOption>
              <MenuItemOption value="Order">Order</MenuItemOption>
              <MenuItemOption value="Genus">Genus</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box>
      <Box flex={1}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Text fontSize="sm">View Type: {viewType}</Text>
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              defaultValue=""
              type="radio"
              onChange={handleViewType}
            >
              <MenuItemOption value="List">List</MenuItemOption>
              <MenuItemOption value="Table">Table</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box>
    </HStack>
  );
};

export default Controls;
