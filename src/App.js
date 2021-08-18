import logo from './logo.svg';
import './App.css';
import Form from './Form.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Please use the following form to sign up!
        </p>
      </header>
      <Form></Form>
    </div>
  );
}

export default App;
