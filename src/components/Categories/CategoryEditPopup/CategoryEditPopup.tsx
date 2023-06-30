import React from "react";
import ButtonCancel from "../../Button/ButtonCancel";
import ButtonSave from "../../Button/ButtonSave";
import { Field, Form } from "formik";

// interface Values {
//   name: string;
// }

function CategoryEditPopup() {
  return (
    <Form>
      <h1>Edit Developers category</h1>
      <label htmlFor="name">name</label>
      <Field type="name" name="name" />
      <ButtonCancel />
      <ButtonSave />
    </Form>
  );
}
export default CategoryEditPopup;
