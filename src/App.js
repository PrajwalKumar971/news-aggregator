import { NavBar, ScrollToTop } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="position-relative" style={{ background: "#3c4043" }}>
      <NavBar />
      <Outlet />
      <ScrollToTop />
    </div>
  );
}

export default App;
