// CharacterDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

// Esta função será responsável por retornar a página específica de cada personagem
function CharacterDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fromHome = location.state?.fromHome || false;
  const characterApiData = location.state?.characterApiData || null;

  const [character, setCharacter] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    api_id: '',
    name: '',
    species: '',
    image: '',
    url: '',
    status: '',
    gender: '',
    type: '',
    origin: '',
    location: '',
    episode_count: 0,
    created_at_api: '',
  });

  const isLoggedIn = !!localStorage.getItem('token');

  const labelMap = {
    name: 'Nome',
    species: 'Espécie',
    image: 'Imagem',
    url: 'URL',
    // adicione mais se precisar
  };

    // API fetch que vai 'bater' os campos daqui com os do BD
  useEffect(() => {
    async function fetchCharacter() {
      if (fromHome && characterApiData) {
        setCharacter(characterApiData);
        setForm({
          api_id: characterApiData.id,
          name: characterApiData.name,
          species: characterApiData.species,
          image: characterApiData.image,
          url: characterApiData.url,
          status: characterApiData.status,
          gender: characterApiData.gender,
          type: characterApiData.type,
          origin: characterApiData.origin?.name || '',
          location: characterApiData.location?.name || '',
          episode_count: characterApiData.episode?.length || 0,
          created_at_api: characterApiData.created,
        });
      } else {
        try {
          const res = await api.get(`/characters/${id}`);
          const data = res.data;

          const normalizedCharacter = {
            ...data,
            id: data.api_id || data.id,
            episode: Array(data.episode_count || 0).fill(''),
            created: data.created_at_api || data.created || '',
            origin: data.origin ? { name: data.origin } : { name: '' },
            location: data.location ? { name: data.location } : { name: '' },
          };

          setCharacter(normalizedCharacter);
          setForm({
            api_id: data.api_id || '',
            name: data.name || '',
            species: data.species || '',
            image: data.image || '',
            url: data.url || '',
            status: data.status || '',
            gender: data.gender || '',
            type: data.type || '',
            origin: data.origin || '',
            location: data.location || '',
            episode_count: data.episode_count || 0,
            created_at_api: data.created_at_api || '',
          });

        } catch (error) {
          toast.error(error.message || 'Erro ao carregar personagem');
        }
      }
    }

    fetchCharacter();
  }, [id, fromHome, characterApiData]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    if (!isLoggedIn) {
      toast.error('Você precisa estar logado para salvar personagens');
      navigate('/login');
      return;
    }
    try {
      await api.post('/characters', form);
      toast.success('Personagem salvo com sucesso!');
      navigate('/characters');
    } catch (error) {
      console.error('Erro ao salvar personagem:', error.response?.data || error.message);
      toast.error('Erro ao salvar personagem');
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/characters/${id}`, form);
      toast.success('Personagem atualizado!');
      setEditMode(false);
      setCharacter(form);
    } catch (error) {
      toast.error(error.message || 'Erro ao atualizar personagem'); // Inseri error.message para o ESlint não acusar erro sem motivo
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/characters/${id}`);
      toast.success('Personagem excluído!');
      navigate('/characters');
    } catch (error) {
      toast.error(error.message || 'Erro ao excluir personagem');
    }
  };

  if (!character) return <p className="text-center mt-5">Carregando...</p>;

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Detalhes do Personagem</h1>

      <div className="card mx-auto shadow w-100" style={{ maxWidth: '1200px' }}>
        <div className="row g-0 d-flex flex-wrap">

          {/* COLUNA DA IMAGEM */}
          <div className="col-12 col-md-4">
            <div className="h-100 w-100">
              <img
                src={character.image}
                alt={character.name}
                className="img-fluid rounded-start"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '100%',
                  objectFit: window.innerWidth < 768 ? 'contain' : 'cover',
                  borderRadius: '0.25rem 0 0 0.25rem',
                }}
              />
            </div>
          </div>

          {/* COLUNA DO CONTEÚDO */}
          <div className="col-12 col-md-8">
            <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: '100%', height: '100%' }}>

              {/* EDIT MODE */}
              {editMode ? (
                <>
                  <div className="row g-3 mb-4">
                    {['name', 'species', 'image', 'url'].map((field) => (
                      <div key={field} className="col-12">
                        <label htmlFor={field} className="form-label fw-bold m-0">
                          {labelMap[field] || field}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          placeholder={field}
                          readOnly={field === 'url'}
                          style={field === 'url' ? { backgroundColor: '#e9ecef' } : {}}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="row g-2">
                    <div className="col-12 col-md-6">
                      <button className="btn btn-secondary w-100 fw-bold py-2" onClick={handleEditToggle}>
                        Cancelar
                      </button>
                    </div>
                    <div className="col-12 col-md-6">
                      <button className="btn btn-success w-100 fw-bold py-2" onClick={handleUpdate}>
                        Salvar
                      </button>
                    </div>
                  </div>

                </>
              ) : (
                <>
                  <h3 className="card-title fw-bold">{character.name}</h3>
                  <div className="row fs-6">
                    <div className="col-12 col-md-6">
                      <p><strong>Espécie:</strong> {character.species}</p>
                      {character.gender && <p><strong>Gênero:</strong> {character.gender}</p>}
                      {character.status && <p><strong>Status:</strong> {character.status}</p>}
                      {character.origin?.name && <p><strong>Origem:</strong> {character.origin.name}</p>}
                      <p><strong>ID na API:</strong> {character.id}</p>
                    </div>
                    <div className="col-12 col-md-6">
                      {character.location?.name && <p><strong>Localização:</strong> {character.location.name}</p>}
                      {character.type && <p><strong>Tipo:</strong> {character.type}</p>}
                      <p><strong>Nº episódios:</strong> {character.episode?.length ?? character.episode_count}</p>
                      <p><strong>Criado na API:</strong> {character.created_at_api || 'Indefinido'}</p>
                      <p><strong>Criado no banco:</strong> {character.created_at_formatted || 'Indefinido'}</p>
                    </div>
                  </div>

                  <div className="row g-2 mt-3">
                    {fromHome && isLoggedIn && (
                      <div className="col-12 col-md-12 text-center">
                        <button className="btn btn-primary w-50 fw-bold py-2" onClick={handleSave}>
                          Salvar personagem
                        </button>
                      </div>
                    )}

                    {!fromHome && (
                      <>
                        <div className="col-12 col-md-6">
                          <button className="btn btn-warning w-100 fw-bold py-2" onClick={handleEditToggle}>
                            Editar
                          </button>
                        </div>
                        <div className="col-12 col-md-6">
                          <button className="btn btn-danger w-100 fw-bold py-2" onClick={handleDelete}>
                            Excluir
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default CharacterDetails;
