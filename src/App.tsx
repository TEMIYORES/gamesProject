import { Outlet } from "react-router";

function App() {

  return (
    <>
      <main className="text-sm">
        <Outlet />
      </main>
    </>
  );
}

export default App;
