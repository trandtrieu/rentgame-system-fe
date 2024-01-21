import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginComponent from "./components/login";
import { AuthProvider } from "./context/authContext";
import Navbar from "./layouts/navbar";
// import Home from "./components/home";
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Navbar} />
            <Route path="/home" component={Navbar} />
            <Route path="/login" component={LoginComponent} />{" "}
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
