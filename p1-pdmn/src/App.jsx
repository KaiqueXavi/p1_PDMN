import React from 'react'
import Busca from './components/Busca'
import api from './utils/viacep'
import LocalidadeLista from './components/LocalidadeLista'
import Grafico from './components/Grafico'


class App extends React.Component {

  api = null

  state = {
    mensagemErro: null,
    localidades: [],
    ufQuantidade: []
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
        const novaContagem = prevState.ufQuantidade.map(item => ({ ...item }))
        const uf = novoLocal.uf

        // verifica se a UF já existe
        const index = novaContagem.findIndex(item => item.uf === uf)

        if (index !== -1) {
          novaContagem[index].quantidade += 1
        } else {
          novaContagem.push({ uf, quantidade: 1 })
        }


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
  //o método render é obrigatório para todos os componentes que herdam de React.Component
  //ele deve retornar o que será exibido na tela

  render() {
    return (
      <div
        className='grid justify-content-center'>
        <div className='col-12'>
          <Busca
            dica ='Digite o cep desejado'
            onBuscaRealizada={this.onBuscaRealizada}/>
            <div className="grid mt-2">
              <div className="col-12 md:col-6"> 
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
              <div className="col-12 md:col-6">
                {this.state.ufQuantidade.length > 0 && (
                  <Grafico ufQuantidade={this.state.ufQuantidade} />
                )}
              </div>
            </div>
        </div>
      </div>
    )
  }
}
export default App