import logo from "./logo.svg";
import "./App.css";
import Auth from "./Auth";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Sign in with google demo</h2>
        <Login />
        <Auth />
      </header>
    </div>
  );
}

export default App;
