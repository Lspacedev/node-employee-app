import Sidebar from "./sidebar";
import DisplayEmployees from "./displayEmployees";
function Home() {
  return (
    <div className="Home">
      <Sidebar />
      <div className="Main">
        <DisplayEmployees />
      </div>
    </div>
  );
}
export default Home;
