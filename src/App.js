import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginComponent from "./components/login";
import { AuthProvider } from "./context/authContext";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={LoginComponent} />{" "}
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
