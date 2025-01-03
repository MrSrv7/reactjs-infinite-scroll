import { CommentsList } from "./components";

const App = () => (
  <section className="flex flex-col items-center justify-center h-screen">
    <h1>Infinite Scroll</h1>
    <div className="mt-8 h-96 overflow-y-scroll w-1/2">
      <CommentsList />
    </div>
  </section>
);

export default App;
