import React from "react";
import { ITask } from "../../../types/task";

interface TaskItemProps {
  task: ITask;
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
