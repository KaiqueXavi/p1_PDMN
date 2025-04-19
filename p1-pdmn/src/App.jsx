import React from 'react'
import Busca from './components/Busca'
import api from './utils/viacep'
import LocalidadeLista from './components/LocalidadeLista'


class App extends React.Component {

  api = null

  state = {
    mensagemErro: null,
    cep: null,
    logradouro: null,
    bairro: null,
    localidade: null,
    uf: null
  }

  onBuscaRealizada = async(termoDeBusca) => {

    const cepPuro = termoDeBusca.replace(/\D/g, '')

    if (cepPuro.length !== 8){
        this.setState({
          mensagemErro: 'CEP inválido'
        })
        console.log("CEP inválido")
        return;
    }
    try{
      const response = await api.get(`/${cepPuro}/json/`)
      this.setState({
        cep: termoDeBusca,
        logradouro: response.data.logradouro,
        bairro: response.data.bairro,
        localidade: response.data.localidade,
        uf: response.data.uf,
        mensagemErro: null
      })
      console.log(response)
    }
    catch(error){
      this.setState({
        mensagemErro: 'Erro ao buscar CEP'
      })
      console.log('Erro' + error)
    }
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