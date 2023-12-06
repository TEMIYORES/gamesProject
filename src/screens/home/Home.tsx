import Sidebar from "../../components/Sidebar";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-8">
        <p>hello world</p>
      </div>
    </div>
  );
};

export default Home;
