import React from 'react'
import Busca from './components/Busca'
import api from './utils/viacep'
import LocalidadeLista from './components/LocalidadeLista'


class App extends React.Component {

  api = null

  state = {
    mensagemErro: null
  }

  onBuscaRealizada = (termoDeBusca) => {
    if (termoDeBusca == ""){
      this.setState({
        mensagemErro: 'CEP inválido'
      })
      console.log("cep inválido")
    }
    console.log(termoDeBusca)
  }

  //o método render é obrigatório para todos os componentes que herdam de React.Component
  //ele deve retornar o que será exibido na tela


  render() {
    return (
      <div
        className='grid justify-content'>
        <div className='col-12'>
          <Busca
            dica ='Digite o cep desejado'
            onBuscaRealizada={this.onBuscaRealizada}/>
            <div className="container mt-2">
              <div className="row">
                <LocalidadeLista/>
                <LocalidadeLista cep="55592-970" logradouro="Rua dos Navegantes" bairro="Vila de Porto de galinhas" localidade="Ipojucas" uf="PE" />
              </div>
            </div>
        </div>
      </div>
    )
  }
}
export default App