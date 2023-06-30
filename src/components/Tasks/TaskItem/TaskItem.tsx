import React from "react";
import { Task } from "../../../types/task";

interface TaskItemProps {
  task: Task;
}

const TaskItem = (props: TaskItemProps) => {
  return (
    <div>
      <p>{props.task.name}</p>
      {/* <p>{props.task.dateStart}</p> */}
      {/* <p>{props.task.dateEnd}</p> */}
    </div>
  );
};

export default TaskItem;
