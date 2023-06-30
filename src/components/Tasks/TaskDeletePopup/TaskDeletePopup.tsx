import React from "react";
import ButtonNo from "../../Button/ButtonNo";
import ButtonYes from "../../Button/ButtonYes";

function TaskDeletePopup() {
  return (
    <div>
      <h1>Do you want delete this task ?</h1>
      <ButtonNo />
      <ButtonYes />
    </div>
  );
}

export default TaskDeletePopup;
