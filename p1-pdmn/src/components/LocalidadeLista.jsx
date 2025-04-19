//rce

import React, { Component } from 'react'

export default class LocalidadeLista extends Component {
  render() {
    if (this.props.mensagemErro){
        return (
            <div className="col-md-6 mb-4">
            <div className="surface-card border-round shadow-2 p-2 text-center text-danger">
              <div className="card-body">
                <p>{this.props.mensagemErro}</p>
              </div>
            </div>
          </div>
        )
    }
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
    mensagemErro: null
}
    
