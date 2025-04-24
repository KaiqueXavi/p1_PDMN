import React, { Component } from 'react'
import { Chart } from 'primereact/chart'

export default class Grafico extends Component {

  gerarDadosDoGrafico = () => {
    const labels = this.props.ufQuantidade.map(item => item.uf)
    const data = this.props.ufQuantidade.map(item => item.quantidade)
    
    
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

  render() {
    const { ufQuantidade } = this.props

    if (!ufQuantidade || ufQuantidade.length === 0) {
      return null
    }

    const dados = this.gerarDadosDoGrafico()

    return (
      <div className="mt-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h3 className="text-center">Distribuição por Estado (UF)</h3>
        <Chart type="pie" data={dados} />
      </div>
    )
  }
}
