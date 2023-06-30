import React from "react";
import ButtonCancel from "../../Button/ButtonCancel";
import ButtonSave from "../../Button/ButtonSave";
import { Field, Form } from "formik";

// interface Values {
//   name: string;
// }

function TaskEditPopup() {
  return (
    <Form>
      <label htmlFor="name">name</label>
      <Field type="name" name="name" />
      <label htmlFor="description">Description</label>
      <Field type="description" name="description" />
      <label htmlFor="start_date">start date</label>
      <Field type="start_date" name="start_date" />
      <label htmlFor="end_date">end date</label>
      <Field type="end_date" name="end_date" />
      <ButtonCancel />
      <ButtonSave />
    </Form>
  );
}
export default TaskEditPopup;
