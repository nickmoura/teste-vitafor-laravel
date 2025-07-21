import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import '../assets/css/characters.css'
import { Info } from 'lucide-react';

// Este JSX retorna a página que mostra os personagens salvos

function Characters() {
  const [characters, setCharacters] = useState([]);
  const toastShown = useRef(false);

  useEffect(() => {
    async function fetchSavedCharacters() {
      try {
        const res = await api.get('/characters');
        if (res.data.length === 0 && !toastShown.current) {
          toast.info('Você ainda não salvou nenhum personagem.');
          toastShown.current = true;
        }
        setCharacters(res.data);
      } catch (error) {
        toast.error(error.message || 'Erro ao carregar personagens salvos');
      }
    }
    fetchSavedCharacters();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1 className='my-4 text-center'>Personagens Salvos</h1>
        <div className="row">
          {characters.length === 0 && <p className="no-character w-50 m-auto mt-3 fs-3"> <Info className='info-icon' size={40} />
            Nenhum personagem salvo ainda.</p>}
          {characters.map(c => (
            <div key={c.id} className="col-md-3 mb-3">
              <div className="card">
                <img src={c.image} className="card-img-top" alt={c.name} />
                <div className="card-body d-flex gap-2 flex-column align-items-center">
                  <h5 className="card-title m-0">{c.name}</h5>
                  <p className="card-subtitle text-body-secondary mb-2">{c.species}</p>
                  <Link
                    to={`/characters/${c.id}`}
                    state={{ fromHome: false }}
                    className="btn btn-primary w-75 fs-5"
                  >
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

export default Characters;
