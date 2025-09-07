import "./App.css";
import Sidenav from "./Components/Sidenav/Sidenav";
import Topbar from "./Components/Sidenav/Topbar";
import ContextState from "./Context/ContextState";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";
import Subscription from "./Pages/Subscription/Subscription";
import DeleteRequest from "./Pages/Delete Request/DeleteRequest";
import Coupons from "./Pages/Coupons/Coupons";
import Home from "./Pages/Home/Home";
import Plans from "./Pages/Plans/Plans";

function App() {
  return (
    <ContextState>
      <Router>
        <div className="App">
          <Sidenav />
          <div className="content">
            <Topbar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/users" exact element={<Users />} />
              <Route path="/delete-request" exact element={<DeleteRequest />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/coupon" exact element={<Coupons />} />
              <Route path="/subscription" exact element={<Subscription />} />
              <Route path="/plans" exact element={<Plans />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ContextState>
  );
}

export default App;
