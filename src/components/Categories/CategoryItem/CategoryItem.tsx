import React from "react";
import { ICategory } from "../../../types/category";

interface CategoryItemProps {
  category: ICategory;
}

const CategoryItem = (props: CategoryItemProps) => {
  return (
    <div>
      <p>{props.category.name}</p>
      <p>Кількість tasks</p>
      {/* <p>{props.category.dateCreated}</p> */}
    </div>
  );
};

export default CategoryItem;
