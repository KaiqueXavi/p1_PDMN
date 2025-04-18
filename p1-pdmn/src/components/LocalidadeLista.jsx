//rce

import React, { Component } from 'react'

export default class LocalidadeLista extends Component {
  render() {
    return (
        <div className="col-md-6 mb-4">
            <div className="surface-card border-round shadow-2 p-2 text-center">
                <div className='card-body text-center'>
                    <p className='font-medium mb-2'>{this.props.cep}</p>
                    <p>{this.props.logradouro}</p>
                    <p>{this.props.bairro}</p>
                    <p>{this.props.localidade} - {this.props.uf}</p>
                </div>
            </div>
        </div>
    )
  }
}

LocalidadeLista.defaultProps = {
    cep: '04094-050',
    logradouro: 'Avenida Pedro Álvares Cabral',
    bairro: 'Parque Ibirapuera',
    localidade: 'São Paulo',
    uf: 'SP'
}
    
