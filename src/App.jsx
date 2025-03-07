import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const TOKEN_API = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmFkNjdjZmZkMzI3ZjQ2YTEwMDZjMzhmMWQ4YTdiMCIsIm5iZiI6MTc0MTI5NjI2Ny4wNDYwMDAyLCJzdWIiOiI2N2NhMTI4YjM2NTk4MjI2YTFhZmJjYzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jdrCzFZN3mFirAZJ7yDEmEic0-0_vamnHndEkMEGuNs';
  const API_KEY = '2bad67cffd327f46a1006c38f1d8a7b0';
  const API_ESTRENOS = 'https://api.themoviedb.org/3/movie/upcoming'
  const API_URL = 'https://api.themoviedb.org/3'
  const URL_IMAGES = 'https://image.tmdb.org/t/p/original';
  const [peliculas, setPeliculas] = useState([])
  const [peli, setPeli] = useState({title: 'Buscando ...'})
  const [estrenos, setEstrenos] = useState([])
  const [buscarPelicula, setBuscarPelicula] = useState('');
  const [buscarEstreno, setBuscarEstreno] = useState('')

  const getEstrenos = async(p) => {
    const tipo = p ? 'search' : 'discover';
    const {data: {results},} = await axios.get(`${API_ESTRENOS}`,{
      params:{
        api_key: API_KEY,
      }
    });
    setEstrenos(results)
  }
  const getPeliculas = async(p) => {
    const tipo = p ? 'search' : 'discover';
    const {data: {results},} = await axios.get(`${API_URL}/${tipo}/movie`, {
      params:{
        api_key: API_KEY,
        query: buscarPelicula,
      }
    });

    setPeliculas(results);
    setPeli(results[0]);
    console.log(results)
  }

  const searchPelicula = (e) =>{
    e.preventDefault();
    getPeliculas(buscarPelicula)
  }

  const searEstreno = (e) => {
    e.preventDefault();
    getEstrenos(buscarEstreno)
  }

  useEffect(() => {
    getEstrenos();
    getPeliculas();
  }, [])
  
  return (
    <>
      <div className='container'>
        {/* barra de navegacion */}
      <nav class="navbar navbar-expand-lg bg-light" data-bs-theme="light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">PELICULAS</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarColor03">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link active" href="#">Inicio
                  <span class="visually-hidden">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Genero</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pais</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">TV Shows</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Peliculas</a>
              </li>
              {/* <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Separated link</a>
                </div>
              </li> */}

            </ul>
            <form class="d-flex" onSubmit={searchPelicula}>
              <input class="form-control me-sm-2" type="search" placeholder="Buscar" onChange={(e)=>{setBuscarPelicula(e.target.value)}}/>
              <button class="btn btn-secondary my-2 my-sm-0" type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </nav>
      </div>
      {/* contenido de la pagina */}
      <div className='container mt-2'>
      <div className='row'>
          {/* barra lateral */}
          <div className='col-md-4'>
          <div className='col-auto' style={{backgroundColor: 'navy'}}>
            <h3 className='text-center' style={{color:'white'}}>Estrenos</h3>
            <form className='container'>
              <div className='col-auto mb-3'>
                <input 
                  type="text" 
                  placeholder='Buscar por:' 
                  className='form-control mb-1' 
                  onChange={(e)=>{setBuscarEstreno(e.target.value)}}
                />
                <button className='btn btn-secondary'>Buscar</button>
              </div>
            </form>
            <div className='row'>
              {estrenos.map((est)=>{
                return <div key={est.id} className='container col-md-9 mb-3'>
                  <img src={`${URL_IMAGES + est.poster_path}`} alt="" height={250} width='100%'/>
                  <h4 className='text-center' style={{color: 'white'}}>{est.title}</h4>
                </div>
              })}
            </div>
          </div>
          </div>
          {/* dashboard de peliculas */}
          <div className='container col-md-6'>
            <div className='row'>
              {peliculas.map((pelicula) => {
                return <div key={pelicula.id} className='col-md-4 mb-3'>
                  <img src={`${URL_IMAGES + pelicula.poster_path}`} height={300} width='100%' />
                  <h5 className='text-center'>{pelicula.title}</h5>
                  <p className='text-center'>{`Estreno: ${pelicula.release_date}`}</p>
                  <p className='text-center'>{`Rating: ${pelicula.vote_average}`}</p>
                </div>
              })}
            </div>
          </div>
      </div>
      </div>
    </>
  )
}

export default App
