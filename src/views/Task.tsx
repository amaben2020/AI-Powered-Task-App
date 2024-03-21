import { useEffect, useState } from "react";
import Dialog from "../components/Dialog/Dialog";
import TaskItem from "../components/TaskItem";
import { ITask } from "../models/interface";
import { getTasks } from "../utils/shared";

const Task = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksError, setTasksError] = useState("");

  const [isViewTask, setIsViewTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask>();

  const handleViewTask = (
    e: React.MouseEvent<HTMLDivElement>,
    activeTask: ITask,
  ) => {
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
        {tasksError ? (
          <span className="m-8 text-error">{tasksError}</span>
        ) : (
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex-1">
              <h3 className="m-8 text-2xl font-bold">Pending Tasks</h3>
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
