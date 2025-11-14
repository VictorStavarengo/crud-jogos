import React from 'react';

function GameList({ games, onDeleteGame, onEditGame }) {

  const getStatusColor = (status) => {
    switch (status) {
      case 'zerado':
        return 'bg-green-500 text-green-100';
      case 'jogando':
        return 'bg-blue-500 text-blue-100'; 
      case 'para-jogar':
        return 'bg-blue-500 text-blue-100';
      case 'dropei':
        return 'bg-red-500 text-red-100';
      default:
        return 'bg-gray-500 text-gray-100';
    }
  };

  return (
    <div className="w-full">
      
     
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {games.length === 0 ? (
          <p className="text-gray-400 text-center md:col-span-2 lg:col-span-3">
            Nenhum jogo na lista ainda.
          </p>
        ) : (
          games.map((game) => (
            
            <div 
              key={game.id} 
              className="bg-gray-900 rounded-lg shadow-xl overflow-hidden
                         transition-all duration-300 ease-in-out
                         hover:scale-[1.02] hover:shadow-2xl"
            >
              {game.imageUrl && (
                <img 
                  src={game.imageUrl} 
                  alt={game.title} 
                  className="w-full h-40 object-cover" 
                />
              )}

              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white">{game.title}</h3>
                  <p className="text-gray-400">{game.genre}</p>
                </div>
                <div className="text-right">
                  <span 
                    className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mb-2 ${getStatusColor(game.status)}`}
                  >
                    {game.status}
                  </span>
                  <div className="mt-2">
                    
                    <button 
                      onClick={() => onEditGame(game)}
                      className="bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold py-1 px-2 rounded mr-2
                                 transition-transform hover:scale-110" 
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => onDeleteGame(game.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded
                                 transition-transform hover:scale-110" 
                    >
                      Excluir
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GameList;