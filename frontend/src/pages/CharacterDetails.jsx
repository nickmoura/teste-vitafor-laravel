// CharacterDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import '../assets/css/details.css'

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
          toast.error('Erro ao carregar personagem');
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
      toast.error('Erro ao atualizar personagem');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/characters/${id}`);
      toast.success('Personagem excluído!');
      navigate('/characters');
    } catch (error) {
      toast.error('Erro ao excluir personagem');
    }
  };

  if (!character) return <p className="text-center mt-5">Carregando...</p>;

  return (
    <div className="container">
      <h1 className="mb-4 text-center">Detalhes do Personagem</h1>
      <div className="card mx-auto shadow-sm" style={{ maxWidth: '1200px', height: '100%' }}>
        <div className="row g-0">
          <div className="col-12 col-md-4 d-flex align-items-stretch"
          >
            <img
              src={character.image}
              className="img-fluid rounded-start w-100 h-100"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.25rem 0 0 0.25rem' }}
              alt={character.name}
            />
          </div>
          <div className="col-12 col-md-8 d-flex align-items-stretch h-100"
          >
            <div className="card-body d-flex flex-column justify-content-between h-100 py-4 px-5" style={{ minHeight: '480px', height: '100%', overflowY: 'auto' }}
            >
              {editMode ? (
                <>
                  <div className="row fs-5 d-flex gap-3">
                    {['name', 'species', 'image', 'url'].map((field) => (
                      <div key={field} className="col-12">
                        <label className="form-label m-0 fw-bold" htmlFor={field}>
                          {labelMap[field] || field}
                        </label>
                        <input
                          type="text"
                          className="form-control fs-5"
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
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    <button className="btn btn-secondary btn-lg fw-bold w-25 details-card-button px-4 py-3" onClick={handleEditToggle}>Cancelar</button>
                    <button className="btn btn-success btn-lg fw-bold w-25 details-card-button px-4 py-3" onClick={handleUpdate}>Salvar</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="card-title m-0 fw-bold">{character.name}</h3>
                  <div className="row text-break fs-5">
                    <div className="col-12 col-md-6">
                      <p className="mb-3"><strong>Espécie:</strong> {character.species}</p>
                      {character.gender && <p className="mb-3"><strong>Gênero:</strong> {character.gender}</p>}
                      {character.status && <p className="mb-3"><strong>Status:</strong> {character.status}</p>}
                      {character.origin?.name && <p className="mb-3"><strong>Origem:</strong> {character.origin.name}</p>}
                      <p className="mb-3"><strong>ID na API:</strong> {character.id}</p>
                    </div>
                    <div className="col-12 col-md-6">
                      {character.location?.name && <p className="mb-3"><strong>Localização:</strong> {character.location.name}</p>}
                      {character.type && <p className="mb-3"><strong>Tipo:</strong> {character.type}</p>}
                      <p className="mb-3"><strong>Nº episódios:</strong> {character.episode?.length ?? character.episode_count ?? 'Indefinido'}</p>
                      <p className="mb-3"><strong>Criado na API:</strong> {character.created_at_api || 'Indefinido'}</p>
                      <p className="mb-3"><strong>Criado no banco:</strong> {character.created_at_formatted || 'Indefinido'}</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">

                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {fromHome && isLoggedIn && (
                      <button className="btn btn-primary btn-lg fw-bold w-50 details-card-button px-4 py-3" onClick={handleSave}>
                        Salvar personagem
                      </button>
                    )}
                    {!fromHome && (
                      <>
                        <button className="btn btn-warning btn-lg fw-bold px-4 py-3 w-100 details-card-button"
                          onClick={handleEditToggle}>
                          Editar
                        </button>
                        <button className="btn btn-danger btn-lg fw-bold px-4 py-3 w-100 details-card-button" onClick={handleDelete}>
                          Excluir
                        </button>
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
