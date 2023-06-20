/* 
import './App.css'; */
import { Formik, useField } from "formik";
const Campo = props => {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        {...field}
        {...props}
        className={meta.error && meta.touched ? 'block w-full px-6 py-3 text-black bg-white border border-gray-200 appearance-none rounded-xl placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm is-valid' : 'block w-full px-6 py-3 text-black bg-white border border-gray-200 appearance-none rounded-xl placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'}
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

        <section>
          <div class="relative flex justify-center max-h-full overflow-hidden lg:px-0 md:px-12">
            <div class="relative z-10 flex flex-col flex-1 px-4 py-10 bg-white shadow-2xl lg:py-24 md:flex-none md:px-28 sm:justify-center">
              <div class="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
                <div class="flex flex-col">
                  <div>
                    <h2 class="text-4xl text-black">Vamos testar!</h2>
                    <p class="mt-2 text-sm text-gray-500">
                      Informe seu dados para que eu possa enviar mais informaçoes
                    </p>
                  </div>
                </div>
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



                      fetch("http://localhost:500",{

                      })
                      .then(res => console.log(res))
                      .catch(err => console.log(err))
                    alert(JSON.stringify(values))
                  }}
                >
                  {(props) => (

                    <form onSubmit={props.handleSubmit} noValidate>
                      <input autocomplete="false" name="hidden" />
                      <input name="_redirect" type="hidden" value="#" />
                      <div class="mt-4 space-y-6">
                        <div>
                          <label class="block mb-3 text-sm font-medium text-gray-600" name="nome">
                            Nome
                          </label>
                          <Campo   placeholder="Seu nome" id='nome' name='nome' />
                        </div>
                        <div class="col-span-full">
                          <label class="block mb-3 text-sm font-medium text-gray-600" name="company">
                            Informe seu numero
                          </label>
                          <Campo   placeholder="Telefone 55xx"  id='telefone' name="telefone"  />
                        </div> 
                        <div class="col-span-full">
                          <label class="block mb-3 text-sm font-medium text-gray-600" name="email">
                            Informe seu email
                          </label>
                          <Campo   placeholder="email@example.com" autocomplete="off" type="email"  id='email' name="email"/>
                        </div>

                        <div class="col-span-full">
                          <button class="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black" type="submit">
                            Cadastrar
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>

              </div>
            </div>
            <div class="hidden bg-white lg:block lg:flex-1 lg:relative sm:contents">
              <div class="absolute inset-0 object-cover w-full h-full bg-white" alt="" height="1866" width="1664">
                <img class="object-center w-full h-auto bg-gray-200" src="https://d33wubrfki0l68.cloudfront.net/64c901dbc4b16388ef27646a320ad9c1441594df/236fd/images/placeholders/rectangle2.svg" alt="" width="1310" height="873" />
              </div>
            </div>
          </div>
        </section>
      
    </div>
  );
}

export default App;
