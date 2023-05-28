
import './App.css';
import { Formik, useField } from "formik";
const Campo = props => {
  const [field, meta] = useField(props);
  return (
    <>
      <input 
      {...field} 
      {...props} 
      className={meta.error && meta.touched ? 'is-valid' : ''} 
      />
      { 
        meta.error && meta.touched ?
        (<div className='invalid-feedback'> {meta.error} </div>)
        : null
      }
    </>
  )
}


const App = () => {
  return (
    <div className="App">
      <div className="container">
        <h1>Entre em contato</h1>
        <p>Cadastre-se é receba mais informações!</p>

        <Formik initialValues={{ nome: "", email: "", telefone: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.nome) {
              errors.nome = "O nome é obrigatorio"
            }

            if (!values.email) {
              errors.email = "O email é obrigatorio";
            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(values.email)) {

              errors.email = "O formato de email incorreto";
            }

            if (!values.telefone) {
              errors.telefone = "O telefone é obrigatorio"
            }

            return errors;
          }}
          onSubmit={(values) => {


            alert(JSON.stringify(values))
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} noValidate>

              <Campo type="text"  id='nome' name='nome' placeholder="Nome" />
              <Campo type="email" id='email' name="email"  placeholder="E-mail" />
              <Campo type="text" id='telefone' name="telefone" placeholder="Telefone" />
              <button type="submit">Enviar</button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;
