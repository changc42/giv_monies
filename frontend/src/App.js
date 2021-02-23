import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./LandingPage";
import SuccessPage from "./SuccessPage";
import "./styles/test.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/success">
          <SuccessPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
