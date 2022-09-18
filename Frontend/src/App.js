import "./App.css";
import Home from "./Home";
import Rooms from "./Rooms";
import Customers from "./Customers";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BookRoom from "./BookRoom";
import CreateRoom from "./CreateRoom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hall Booking</h1>
      </header>
      <BrowserRouter>
        <Navigation />{" "}
        <Switch>
          <Route exact path="/home" render={() => <Home />} />
          <Route path="/rooms" render={() => <Rooms />} />
          <Route path="/customers" render={() => <Customers />} />
          <Route path="/createroom" render={() => <CreateRoom />} />
          <Route path="/bookroom" render={() => <BookRoom />} />
          <Route path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
