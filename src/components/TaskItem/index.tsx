import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDocument, updateDocument } from "../../models/db";
import { IPayload, ITask } from "../../models/interface";
import { getTasks } from "../../utils/shared";
import Button from "../Button";

interface TaskItemProps {
  task: ITask;
  setTasks?: (tasks: ITask[]) => void;
  handleViewTask: () => void;
  isViewTask: boolean;
}

function TaskItem({
  task,
  setTasks,
  isViewTask = false,
  handleViewTask,
}: TaskItemProps) {
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();

  const handleEdit = async (currentTask: ITask) => {
    navigate("/", { state: { task: currentTask } });
  };

  //paste here
  const updateTasks = async () => {
    try {
      const allTasks = await getTasks();
      if (setTasks) setTasks(allTasks.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    currentTaskId: string,
  ) => {
    e.stopPropagation();
    try {
      await deleteDocument(currentTaskId);
      if (isViewTask) {
        // FORCES THE UI TO UPDATE TO THE PROPER STATE
        navigate(0);
      } else {
        updateTasks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckbox = async (
    currentTask: IPayload,
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const payload: IPayload = {
      title: currentTask.title,
      description: currentTask.description,
      due_date: currentTask.due_date,
      priority: currentTask.priority,
      done: e.target.checked,
    };

    try {
      await updateDocument(payload, id);
      updateTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="p-4 m-8 transition duration-300 ease-in-out border rounded-md cursor-pointer border-container hover:shadow-lg max-h- 96"
        onClick={handleViewTask}
      >
        <div className="p-4 m-8 transition duration-300 ease-in-out border rounded-md cursor-pointer border-container hover:shadow-lg max-h-96">
          <section
            key={task.$id}
            className="flex flex-col justify-between h-full gap-2 my-4"
          >
            <section className="flex flex-wrap items-center justify-between gap-4">
              {task.priority && (
                <span>
                  <span className="font-medium">Priority: </span>
                  <span
                    className={`${
                      task.priority === "low"
                        ? "bg-lowPriority text-iconColor"
                        : task.priority === "medium"
                        ? "bg-mediumPriority text-iconColor"
                        : "bg-highPriority text-iconColor"
                    } py-1 px-2 rounded-md`}
                  >
                    {task.priority}
                  </span>
                </span>
              )}
              <div className="flex gap-2 py-1 ml-auto">
                <Button
                  handleClick={() => handleEdit(task)}
                  extraBtnClasses="bg-ok"
                >
                  <span className="font-medium">Edit</span>
                  <PencilSquareIcon height={25} className="hidden lg:flex" />
                </Button>
                <Button
                  handleClick={(e) => handleDelete(e, task.$id)}
                  extraBtnClasses="bg-highPriority"
                >
                  <span className="font-medium">Delete</span>
                  <TrashIcon height={25} className="hidden lg:flex" />
                </Button>
              </div>
            </section>
            <section className="">
              <h2 className="py-2 text-xl font-medium break-words">
                {task.title}
              </h2>
              <p className="py-1 mb-4 break-words min-h-16">
                {task.description.length > 70 && !isViewTask
                  ? task.description.substring(0, 70) + "..."
                  : task.description}
              </p>
              <span className="mt-2 font-extralight">
                <span className="font-medium">Due on: </span>
                <span className="underline">
                  {`${new Date(task.due_date).toLocaleDateString()}`}
                </span>
              </span>
            </section>
            <section className="flex justify-between">
              {task.done ? (
                <span className="items-center ml-auto text-ok font-bol">
                  Completed
                </span>
              ) : (
                <div className="flex items-center ml-auto transition duration-300 ease-in-out hover:scale-105">
                  <label htmlFor="done" className="mr-2 font-light">
                    Mark as complete
                  </label>
                  <input
                    type="checkbox"
                    checked={isDone}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      setIsDone(e.target.checked);
                      handleCheckbox(task, task.$id, e);
                    }}
                    className="rounded-sm size-5 accent-pink-600"
                  />
                </div>
              )}

              {!task.done && (
                <Button
                  handleClick={() => handleEdit(task)}
                  extraBtnClasses="bg-ok"
                >
                  <span className="font-medium">Edit</span>
                  <PencilSquareIcon height={25} className="hidden lg:flex" />
                </Button>
              )}
            </section>
          </section>
        </div>
      </div>
    </>
  );
}
export default TaskItem;
