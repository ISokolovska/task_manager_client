import React from "react";
import ButtonNo from "../../Button/ButtonNo";
import ButtonYes from "../../Button/ButtonYes";

function CategoryDeletePopup() {
  return (
    <div>
      <h1>Do you want delete this category ?</h1>
      <ButtonNo />
      <ButtonYes />
    </div>
  );
}

export default CategoryDeletePopup;
