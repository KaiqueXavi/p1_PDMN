import React from 'react'
import Busca from './components/Busca'

class App extends React.Component {

  onBuscaRealizada = (termoDeBusca) => {
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
        </div>
      </div>
    )
  }
}
export default App