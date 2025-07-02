export type Nutrition = {
    calories: number;
    fat: number;
    sugar: number;
    carbohydrates: number;
    protein: number;
  };
  
export type Fruit = {
    id: number;
    name: string;
    family: string;
    genus: string;
    order: string;
    nutritions: Nutrition;
  };
  
export type FruitViewProps = {
    fruits: Fruit[];
    groupBy: string;
    viewType: string;
    quantities: Record<number,number>;
    onQuantityChange: (operation:string, fruitId:number)=>void;
  };
  
export type GroupBySelection = "family" | "genus" | "order"| "none";

export type GroupedFruitsProps = {
  groupedFruits: Record<string, Fruit[]>;
  groupBy: string;
  quantities: Record<number,number>;
  onQuantityChange: (operation:string, fruitId:number)=>void;
};

export type JarViewProps = {
  selectedFruits: Fruit[];
  quantities: Record<number,number>;
}

export type JarPieChartProps = {
  data: Record<string, number>;
};