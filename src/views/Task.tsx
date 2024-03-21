import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Dialog from "../components/Dialog/Dialog";
import Search from "../components/Search/Search";
import Select from "../components/Select";
import TaskItem from "../components/TaskItem";
import { sortByDueDate } from "../models/db";
import { ITask } from "../models/interface";
import { getTasks } from "../utils/shared";

const Task = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksError, setTasksError] = useState("");
  const navigate = useNavigate();
  const [isViewTask, setIsViewTask] = useState(true);
  const [selectedTask, setSelectedTask] = useState<ITask>();
  const selectArray = [
    "priority - (low - high)",
    "priority - (high - low)",
    "due date - (earliest - latest)",
    "due date - (latest - earliest)",
  ];

  const sortByPriority = (tasksList: ITask[], isAsc: boolean): ITask[] => {
    const priorityOrder: { [key: string]: number } = {
      low: 1,
      medium: 2,
      high: 3,
    };

    return [...tasksList].sort((a, b) => {
      const priorityA = priorityOrder[a.priority!.toLowerCase()];
      const priorityB = priorityOrder[b.priority!.toLowerCase()];
      return isAsc ? priorityA - priorityB : priorityB - priorityA;
    });
  };

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedOption = e.target.value;
    const doneTasks = tasks.filter((task) => task.done);

    switch (selectedOption) {
      case "priority - (low - high)":
      case "priority - (high - low)": {
        const isAsc = selectedOption === "priority - (low - high)";
        const sortedTasks = sortByPriority(tasks, isAsc);
        setTasks([...doneTasks, ...sortedTasks.filter((task) => !task.done)]);
        break;
      }
      case "due date - (earliest - latest)":
      case "due date - (latest - earliest)": {
        const isEarliestToLatest =
          selectedOption === "due date - (earliest - latest)";
        const dueDateResult = await sortByDueDate(isEarliestToLatest);
        const sortedTasks = dueDateResult.documents as ITask[];
        setTasks([...doneTasks, ...sortedTasks.filter((task) => !task.done)]);
        break;
      }
      default:
        break;
    }
  };

  const handleViewTask = (activeTask: ITask) => {
    setIsViewTask(true);
    setSelectedTask(activeTask);
  };

  useEffect(() => {
    getTasks()
      .then((res) => {
        setTasks(res.reverse());
      })
      .catch((err) => {
        console.error(err);
        setTasksError("Error fetching tasks, please try again");
      });
  }, []);
  return (
    <main className="container mx-auto">
      <section className="max-w-5xl p-16 m-12 mx-auto">
        {isViewTask && selectedTask && (
          <Dialog key={selectedTask.$id} setIsViewTask={setIsViewTask}>
            <TaskItem
              task={selectedTask}
              handleViewTask={() => handleViewTask(selectedTask!)}
              isViewTask={isViewTask}
            />
          </Dialog>
        )}
        <h1 className="py-3 mb-16 text-4xl font-bold text-center md:text-7xl">
          Your Tasks
        </h1>
        <div className="flex flex-col-reverse items-start gap-8 m-8 md:flex-row md:items-center md:justify-between">
          <Search />
          <Button
            handleClick={() => navigate("/")}
            extraBtnClasses="bg-primary text-white font-medium py-2 hover:bg-	primaryHover ml-auto"
          >
            <span>Add Task</span>
            <PlusIcon height={25} className="hidden md:flex" />
          </Button>
        </div>
        {tasksError ? (
          <span className="m-8 text-error">{tasksError}</span>
        ) : (
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex-1">
              <h3 className="m-8 text-2xl font-bold">Pending Tasks</h3>
              <div className="flex flex-col items-start justify-between gap-1 m-8 lg:items-center lg:flex-row">
                <span className="font-medium">Sort Tasks by: </span>
                <Select
                  defaultSelectValue={selectArray[0]}
                  handleSelectChange={handleSelectChange}
                  selectOptions={selectArray}
                />
              </div>
              <div>
                {tasks
                  .filter((task) => !task.done)
                  .map((task) => (
                    <TaskItem
                      key={task.$id}
                      task={task}
                      setTasks={setTasks}
                      handleViewTask={() => handleViewTask(task)}
                      isViewTask={isViewTask}
                    />
                  ))}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="m-8 text-2xl font-bold">Completed Tasks</h3>
              <div>
                {tasks
                  .filter((task) => task.done)
                  .map((task) => (
                    <TaskItem
                      key={task.$id}
                      task={task}
                      setTasks={setTasks}
                      handleViewTask={() => handleViewTask(task)}
                      isViewTask={isViewTask}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Task;
