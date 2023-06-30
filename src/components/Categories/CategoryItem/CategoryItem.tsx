import React from "react";
import ButtonActions from "../../Button/ButtonActions";
import ButtonMore from "../../Button/ButtonMore";
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
      <ButtonActions />
      <ButtonMore />
    </div>
  );
};

export default CategoryItem;
