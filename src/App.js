import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./context/authContext";
import Navbar from "./components/navbar";
import HomePage from "./components/HomePage";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchProduct from "./layouts/SearchProduct";
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ToastContainer />
          <Navbar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/search" component={SearchProduct} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
