import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      cpf_cnpj: '',
      nome_logradouro: '',
      numero: '',
      complemento: '',
      data_nascimento: '',
      fetchData: [],
      allData: [],
      arrayLength: 0,
      index: 0,
      id: 0
    }
  }

  getAll = axios.get("/api/getAll")
    .then((response) => {
      return response.data
    })

  handleChange = (event) => {
    let nam = event.target.id;
    let val = event.target.value
    this.setState({
      [nam]: val
    })
  }

  componentDidMount() {
    this.getAll.then((data) => {
      if (data.length) {
        this.setState({ arrayLength: data.length });
        this.setState({ allData: data });
        axios.get(`/api/get/${data[0].id}`)
          .then((response) => {
            this.setState({
              fetchData: response.data,
              id: data[0].id
            })
          })
      }
    })
  }

  edit = (id) => {
    axios.put(`/api/update/${id}`, this.state);
    alert('Alterações Salvas!')
  }

  previousPage = () => {
    const idx = this.state.index - 1
      , id = this.state.allData[idx].id;
    axios.get(`/api/get/${id}`)
      .then((response) => {
        this.setState({
          fetchData: response.data,
          index: idx,
          id: id
        })
      })
  }

  nextPage = () => {
    const idx = this.state.index + 1
      , id = this.state.allData[idx].id;
    axios.get(`/api/get/${id}`)
      .then((response) => {
        this.setState({
          fetchData: response.data,
          index: idx,
          id: id
        })
      })
  }

  render() {
    let id = this.state.id;
    let card = this.state.fetchData.map((val, key) => (
      <React.Fragment key={key}>
        <form>
          <div className='list-group-item d-flex gap-5'>
            <a href='#' onClick={() => { this.previousPage(); } }>
              <i className={this.state.index == 0 ? undefined : 'fa-solid fa-chevron-left fa-3x'}></i>
            </a>
            <div className='w-100 text-center'>
              <h3 className="opacity-50 text-bold">ID: {id}</h3>
            </div>
            <a href='#' onClick={() => { this.nextPage(); } }>
              <i className={this.state.index == this.state.arrayLength - 1 ? undefined : 'fa-solid fa-chevron-right fa-3x'}></i>
            </a>
          </div>
          <div className="list-group-item d-flex" aria-current="true">
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div className='w-100'>

                <div className='form-group py-3' key={val.nome}>
                  <label className={val.nome === val.nome_legado ? 'text-muted' : 'text-warning'} htmlFor='nome'>Nome</label>
                  <input type="text" className='form-control' id='nome'
                    placeholder='Nome' defaultValue={val.nome} onChange={this.handleChange}></input>
                  <label className={val.nome === val.nome_legado ? 'text-muted' : 'text-warning'} htmlFor='nome_legado'>Nome Legado</label>
                  <input type="text" disabled className='form-control' id='nome_legado'
                    placeholder='Nome Legado' value={val.nome_legado}></input>
                </div>

                <div className='form-group py-3' key={val.cpf_cnpj}>
                  <label className={val.cpf_cnpj === val.cpf_cnpj_legado ? 'text-muted' : 'text-warning'} htmlFor='cpf_cnpj'>CPF/CNPJ</label>
                  <input type="text" className='form-control' id='cpf_cnpj'
                    placeholder='CPF / CNPJ' defaultValue={val.cpf_cnpj} onChange={this.handleChange}></input>
                  <label className={val.cpf_cnpj === val.cpf_cnpj_legado ? 'text-muted' : 'text-warning'} htmlFor='cpf_cnpj_legado'>CPF/CNPJ Legado</label>
                  <input type="text" disabled className='form-control' id='cpf_cnpj_legado'
                    placeholder='CPF/CNPJ Legado' value={val.cpf_cnpj_legado}></input>
                </div>

                <div className='form-group py-3' key={val.nome_logradouro}>
                  <label className={val.nome_logradouro === val.nome_logradouro_legado ? 'text-muted' : 'text-warning'} htmlFor='nome_logradouro'>Nome Logradouro</label>
                  <input type="text" className='form-control' id='nome_logradouro'
                    placeholder='Nome Logradouro' defaultValue={val.nome_logradouro} onChange={this.handleChange}></input>
                  <label className={val.nome_logradouro === val.nome_logradouro_legado ? 'text-muted' : 'text-warning'} htmlFor='nome_logradouro_legado'>Nome Logradouro Legado</label>
                  <input type="text" disabled className='form-control' id='nome_logradouro_legado'
                    placeholder='Nome Logradouro Legado' value={val.nome_logradouro_legado}></input>
                </div>

                <div className='form-group py-3' key={val.numero}>
                  <label className={val.numero === val.numero_legado ? 'text-muted' : 'text-warning'} htmlFor='numero'>Número</label>
                  <input type="text" className='form-control' id='numero'
                    placeholder='Número' defaultValue={val.numero} onChange={this.handleChange}></input>
                  <label className={val.numero === val.numero_legado ? 'text-muted' : 'text-warning'} htmlFor='numero_legado'>Número Legado</label>
                  <input type="text" disabled className='form-control' id='numero_legado'
                    placeholder='Número Legado' value={val.numero_legado}></input>
                </div>

                <div className='form-group py-3' key={val.complemento}>
                  <label className={val.complemento === val.complemento_legado ? 'text-muted' : 'text-warning'} htmlFor='complemento'>Complemento</label>
                  <input type="text" className='form-control' id='complemento'
                    placeholder='Complemento' defaultValue={val.complemento} onChange={this.handleChange}></input>
                  <label className={val.complemento === val.complemento_legado ? 'text-muted' : 'text-warning'} htmlFor='complemento_legado'>Complemento Legado</label>
                  <input type="text" disabled className='form-control' id='complemento_legado'
                    placeholder='Complemento Legado' value={val.complemento_legado}></input>
                </div>

                <div className='form-group py-3' key={val.data_nascimento}>
                  <label className={val.data_nascimento === val.data_nascimento_legado ? 'text-muted' : 'text-warning'} htmlFor='data_nascimento'>Data Nascimento</label>
                  <input type="text" className='form-control' id='data_nascimento'
                    placeholder='Data Nascimento' defaultValue={val.data_nascimento} onChange={this.handleChange}></input>
                  <label className={val.data_nascimento === val.data_nascimento_legado ? 'text-muted' : 'text-warning'} htmlFor='data_nascimento_legado'>Data Nascimento Legado</label>
                  <input type="text" disabled className='form-control' id='data_nascimento_legado'
                    placeholder='Data Nascimento Legado' value={val.data_nascimento_legado}></input>
                </div>

              </div>
            </div>
          </div>
          <div className='list-group-item text-center'>
            <Button className='m-2 btn-md' onClick={() => { this.edit(val.id); } }><i className='fa fa-check fa-fw'></i> Salvar Alterações</Button>
          </div>
        </form>
      </React.Fragment>
    ))


    return (
      <div className='App m-2 d-flex justify-content-center list-group'>                  
        <Container>
          {card}
        </Container>
      </div>
    );
  }

}

export default App;
