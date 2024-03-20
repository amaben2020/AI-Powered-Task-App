import AddTask from "../components/AddTask";

const Index = () => {
  return (
    <main className="container mx-auto">
      <section className="max-w-5xl p-16 m-12 mx-auto">
        <h1 className="py-3 mb-16 text-4xl font-bold text-center md:text-7xl">
          AI-enhanced, Voice-enabled, Searchable Task Manager
        </h1>
        <AddTask />
      </section>
    </main>
  );
};

export default Index;
