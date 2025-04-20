import React from 'react'
import Busca from './components/Busca'
import api from './utils/viacep'
import LocalidadeLista from './components/LocalidadeLista'
import {Chart} from 'primereact/chart'


class App extends React.Component {

  api = null

  state = {
    mensagemErro: null,
    localidades: [],
    ufQuantidade: {}
  }

  onBuscaRealizada = async(termoDeBusca) => {

    const cepPuro = termoDeBusca.replace(/\D/g, '')

    if (cepPuro.length !== 8){
        this.setState({
          mensagemErro: 'CEP inválido, ele deve ter apenas 8 digitos'
        })
        return
    }
    try{
      const response = await api.get(`/${cepPuro}/json/`)
      if (response.data.erro){
        this.setState({
          mensagemErro: 'CEP não encontrado ou não existe'
        })
        return;
      }
      const novoLocal = {
        cep: cepPuro,
        logradouro: response.data.logradouro,
        bairro: response.data.bairro,
        localidade: response.data.localidade,
        uf: response.data.uf,
      }
      this.setState((prevState) =>{
        const novaContagem = {...prevState.ufQuantidade}
        const uf = novoLocal.uf
        novaContagem[uf] = (novaContagem[uf] || 0) + 1

        return {
          mensagemErro: null,
          localidades: [novoLocal, ...prevState.localidades],
          ufQuantidade: novaContagem
        }
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
  gerarDadosDoGrafico() {
    const { ufQuantidade } = this.state
    const labels = Object.keys(ufQuantidade)
    const data = Object.values(ufQuantidade)

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC',
            '#FF6384', '#36A2EB', '#FFCE56', '#009688',
            '#8D6E63', '#26C6DA', '#9CCC65', '#FF7043'
          ],
        }
      ]
    }
  }


  //o método render é obrigatório para todos os componentes que herdam de React.Component
  //ele deve retornar o que será exibido na tela


  render() {
    const dadosGrafico = this.gerarDadosDoGrafico()
    return (
      <div
        className='grid justify-content'>
        <div className='col-12'>
          <Busca
            dica ='Digite o cep desejado'
            onBuscaRealizada={this.onBuscaRealizada}/>
            <div className="container mt-2">
              <div className="row">
                {this.state.mensagemErro && (
                  <LocalidadeLista mensagemErro={this.state.mensagemErro}/>
                )}
                {this.state.localidades.map((item, index) =>(
                  <LocalidadeLista 
                    key={index}
                    cep = {item.cep} 
                    logradouro={item.logradouro} 
                    bairro={item.bairro} 
                    localidade={item.localidade} 
                    uf={item.uf}
                  />
                ))}
              </div>
            </div>
            {Object.keys(this.state.ufQuantidade).length > 0 && (
            <div className="mt-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <h3 className="text-center">Distribuição por Estado (UF)</h3>
              <Chart type="pie" data={dadosGrafico} />
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default App