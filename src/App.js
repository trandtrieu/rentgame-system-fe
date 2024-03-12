import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Navbar from "./components/navbar";
import HomePage from "./components/HomePage";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchProduct from "./layouts/SearchProduct";
import DetailProductComponent from "./pages/DetailGameComponent";
import StarRating from "./pages/StarRating";
import AppWrapper from "./util/AppWrapper";
import { CartProvider } from "./context/CartProvider";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [showPreloader, setShowPreloader] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setShowPreloader(false);

    const unlisten = history.listen(() => {
      setShowPreloader(true);

      setTimeout(() => {
        setShowPreloader(false);
      }, 1000);
    });

    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <>
      {showPreloader && (
        <div className="preloader">
          <div className="loader">
            <span></span>
          </div>
        </div>
      )}
      <AuthProvider>
        <CartProvider>
          <AppWrapper>
            <ToastContainer />
            <Navbar />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/home" component={HomePage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/search" component={SearchProduct} />
              <Route path="/test" component={StarRating} />
              <Route
                path="/detail-game/:gameId"
                component={DetailProductComponent}
              />
            </Switch>
          </AppWrapper>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
