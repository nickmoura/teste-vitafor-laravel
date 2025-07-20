//Home.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../assets/css/home.css'


function Home() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const res = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(res.data.results);
      } catch (error) {
        toast.error('Erro ao carregar personagens da API externa');
      }
    }
    fetchCharacters();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1 className='display-3 text-center mb-5'>Personagens Rick & Morty</h1>
        <div className="row">
          {characters.map(c => (
            <div key={c.id} className="col-md-3 mb-3">
              <div className="card">
                <img src={c.image} className="card-img-top" alt={c.name} />
                <div className="card-body d-flex gap-2 flex-column align-items-center">
                  <h5 className="card-title m-0">{c.name}</h5>
                  <p className="card-subtitle text-body-secondary m-0">{c.species}</p>
                  <Link to={`/characters/${c.id}`} state={{ fromHome: true, characterApiData: c }} className="btn btn-primary">
                    Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
