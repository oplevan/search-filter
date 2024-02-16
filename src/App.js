import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Catalogue } from "./pages";
import { Footer, Header, ScrollButton } from "./components";
import config from "./config.json";
import "./styles/main.scss";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={config.url.HOME}>
          <Catalogue />
        </Route>
      </Switch>
      <Footer />
      <ScrollButton />
    </Router>
  );
}

export default App;
