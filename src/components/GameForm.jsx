import React, { useState, useEffect } from 'react';
import { genreOptions } from '../utils/constants';

function GameForm({ onAddGame, onUpdateGame, editingGame, setEditingGame }) {
  
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState(''); 
  const [status, setStatus] = useState('jogando');
  const [imageUrl, setImageUrl] = useState('');

  const [apiSearchTerm, setApiSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // 1. NOVO ESTADO DE "CARREGANDO"
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  useEffect(() => {
    if (editingGame) {
      setTitle(editingGame.title);
      setGenre(editingGame.genre);
      setStatus(editingGame.status);
      setImageUrl(editingGame.imageUrl || '');
    } else {
      setTitle('');
      setGenre(''); 
      setStatus('jogando');
      setImageUrl('');
    }
  }, [editingGame]); 

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const gameData = { title, genre, status, imageUrl };
    if (editingGame) {
      onUpdateGame({ ...gameData, id: editingGame.id });
    } else {
      onAddGame(gameData);
    }
  };

  // --- LÓGICA ATUALIZADA COM "CARREGANDO" ---
  const handleApiSearch = async () => {
    if (apiSearchTerm.trim() === '') return;
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    if (!apiKey) {
      console.error("Chave da API RAWG não encontrada! Verifique seu .env.local");
      return;
    }

    setIsLoadingApi(true); 

    try {
      const response = await fetch(`https://api.rawg.io/api/games?search=${apiSearchTerm}&key=${apiKey}&page_size=5`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Erro ao buscar na API RAWG:", error);
    } finally {
      setIsLoadingApi(false); 
    }
  };

  const handleSelectGame = (game) => {
    setTitle(game.name); 
    setApiSearchTerm(''); 
    setSearchResults([]); 
  };
 

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {editingGame ? 'Editar Jogo' : 'Adicionar Novo Jogo'}
      </h2>

      {/* --- CAMPO DE BUSCA DA API --- */}
      <div className="mb-6"> 
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Assistente de Título (RAWG)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar nome do jogo na API..."
            value={apiSearchTerm}
            onChange={(e) => setApiSearchTerm(e.target.value)}
            className="form-input-api" 
            disabled={isLoadingApi} 
          />
          <button
            type="button" 
            onClick={handleApiSearch}
            className="btn-api-search" 
            disabled={isLoadingApi} 
          >
            {/* 6. MUDA O TEXTO DO BOTÃO */}
            {isLoadingApi ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        
        {/* Lista de Resultados da API */}
        {searchResults.length > 0 && (
          <div className="flex flex-col gap-2 mt-4">
            {searchResults.map((game) => (
              <button
                key={game.id}
                type="button"
                onClick={() => handleSelectGame(game)}
                className="btn-api-result" 
              >
                {game.name} 
                {game.released && (
                  <span className="text-gray-400 ml-2">({game.released.split('-')[0]})</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* --- FIM DO CAMPO DE BUSCA DA API --- */}

      {/* Campo Título */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-300 text-sm font-bold mb-2">
          Título do Jogo
        </label>
        <input
          type="text" id="title" value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input-std" 
          required
        />
      </div>

      {/* --- CAMPO GÊNERO --- */}
      <div className="mb-4">
        <label htmlFor="genre" className="block text-gray-300 text-sm font-bold mb-2">
          Gênero
        </label>
        <select
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="form-input-std" 
          required 
        >
          <option value="" disabled>
            Selecione um gênero...
          </option>

          {/* AGORA USA A LISTA IMPORTADA */}
          {genreOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Campo URL da Imagem */}
      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-gray-300 text-sm font-bold mb-2">
          URL da Imagem de Capa (Manual)
        </label>
        <input
          type="text" id="imageUrl" value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://exemplo.com/imagem.png"
          className="form-input-std" 
        />
      </div>

      {/* Campo Status */}
      <div className="mb-6">
        <label htmlFor="status" className="block text-gray-300 text-sm font-bold mb-2">
          Status
        </label>
        <select
          id="status" value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-input-std" 
        >
          <option value="jogando">Jogando</option>
          <option value="zerado">Zerado</option>
          <option value="para-jogar">Para Jogar</option>
          <option value="dropei">Dropei</option>
        </select>
      </div>
      
      {/* Botões */}
      <div className="flex flex-col gap-4">
        <button 
          type="submit" 
          className="btn-primary" 
        >
          {editingGame ? 'Salvar Alterações' : 'Adicionar Jogo'}
        </button>
        {editingGame && (
          <button 
            type="button" 
            onClick={() => setEditingGame(null)} 
            className="btn-secondary" 
          >
            Cancelar Edição
          </button>
        )}
      </div>

    </form>
  );
}

export default GameForm;