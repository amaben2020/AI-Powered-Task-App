import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddTask from "../components/AddTask";
import { ITask } from "../models/interface";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const taskFromState: ITask = location.state?.task;

  const [taskToEdit] = useState<ITask | null>(taskFromState ?? null);

  useEffect(() => {
    if (taskFromState) {
      navigate(location.pathname, {});
    }
  }, [taskFromState, location.pathname, navigate]);

  return (
    <main className="container mx-auto">
      <section className="max-w-5xl p-16 m-12 mx-auto">
        <h1 className="py-3 mb-16 text-4xl font-bold text-center md:text-7xl">
          AI-enhanced, Voice-enabled, Searchable Task Manager
        </h1>
        <AddTask task={taskToEdit} isEdit={taskToEdit ? true : false} />
      </section>
    </main>
  );
};

export default Index;
