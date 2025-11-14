import { useState, useEffect } from 'react';
import GameForm from './components/GameForm';
import GameList from './components/GameList'; 
import { genreOptions } from './utils/constants';

// 1. Importar o 'toast'
import { toast } from 'react-toastify';

const LOCAL_STORAGE_KEY = 'meu-crud-jogos';

function App() {
  
  const [games, setGames] = useState(() => {
    const storedGames = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedGames) {
      return JSON.parse(storedGames);
    }
    return [{ 
      id: 1, 
      title: 'Elden Ring', 
      genre: 'RPG', 
      status: 'jogando', 
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-tbrANd9GeT-9G-80s-s-i_1f8-8wY_0w&s' 
    }];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(games));
  }, [games]); 

  const [editingGame, setEditingGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [genreFilter, setGenreFilter] = useState('todos');

  // TOAST ---
  const handleAddGame = (newGameData) => {
    const newGame = { ...newGameData, id: Date.now() };
    setGames( (prevGames) => [...prevGames, newGame] );
    toast.success("Jogo adicionado com sucesso!");
  };
  const handleDeleteGame = (idToDelete) => {
    setGames( games.filter( (game) => game.id !== idToDelete ) );
    toast.error("Jogo excluído."); 
  };
  const handleSelectGameToEdit = (game) => {
    setEditingGame(game);
  };
  const handleUpdateGame = (updatedGame) => {
    const updatedGamesList = games.map((game) => 
      game.id === updatedGame.id ? updatedGame : game
    );
    setGames(updatedGamesList);
    setEditingGame(null); 
    toast.info("Jogo atualizado!"); 
  };

  const filteredGames = games
    .filter(game => { // Filtro de Status
      if (statusFilter === 'todos') return true;
      return game.status === statusFilter;
    })
    .filter(game => { // Filtro de Gênero
      if (genreFilter === 'todos') return true;
      return game.genre === genreFilter;
    })
    .filter(game => { // Filtro de Título
      return game.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  // ---LÓGICA ATUALIZADA ---

  return (
    <div className="bg-black min-h-screen w-full flex flex-col md:flex-row md:items-start p-4 md:p-8 md:px-12 md:gap-12">
      
      {/* --- COLUNA ESQUERDA (Formulário) --- */}
      <div className="w-full md:w-[450px] flex-shrink-0 md:sticky md:top-8">
        <GameForm 
          onAddGame={handleAddGame}
          onUpdateGame={handleUpdateGame}
          editingGame={editingGame}
          setEditingGame={setEditingGame}
        />
      </div>

      {/* --- COLUNA DIREITA (Atualizada) --- */}
      <div className="w-full flex-1">
        
        {/* --- CABEÇALHO DA LISTA --- */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 pb-4 border-b border-gray-700">
          
          <h2 className="text-2xl font-bold text-white">
            Minha Lista de Jogos
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input-std" 
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input-std"
            >
              <option value="todos">Todos os Status</option>
              <option value="jogando">Jogando</option>
              <option value="zerado">Zerado</option>
              <option value="para-jogar">Para Jogar</option>
              <option value="dropei">Dropei</option>
            </select>

            {/* --- FILTRO DE GÊNERO --- */}
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="form-input-std"
            >
              <option value="todos">Todos os Gêneros</option>
              {/*  LISTA IMPORTADA */}
              {genreOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            
          </div>
        </div>
        
        {/* A Lista de Jogos */}
        <GameList 
          games={filteredGames} 
          onDeleteGame={handleDeleteGame}
          onEditGame={handleSelectGameToEdit}
        />
      </div>
    </div>
  )
}

export default App