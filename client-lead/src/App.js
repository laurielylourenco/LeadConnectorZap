
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Contact Us</h1>
          <p>Cadastre-se é tenha mais informações!</p>
        <form>

          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="text" placeholder="Telefone" />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
