'use client'
import { useEffect, useState } from 'react';

// Define the type for the game
interface Games {
  gID: number;
  gName: string;
  gGenre: string;
  gDeveloper: number;
  gPublisher: number;
  gReleaseDate: string;
  gHoursToComplete: number;
  gRetailPrice: number;
  gCurrentPlayerCount: number;
  gMaxPlayerCount: number;
}

export default function GamesComponent() {
  const [games, setGames] = useState<Games[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // For tracking loading state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility
  const [newGame, setNewGame] = useState<Omit<Games, 'gID'>>({
    gName: '',
    gGenre: '',
    gDeveloper: 0,
    gPublisher: 0,
    gReleaseDate: '',
    gHoursToComplete: 0,
    gRetailPrice: 0,
    gCurrentPlayerCount: 0,
    gMaxPlayerCount: 0,
  }); // Form state for the new game

  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/games');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGame((prev) => ({
      ...prev,
      [name]:
        ['gHoursToComplete', 'gRetailPrice', 'gCurrentPlayerCount', 'gMaxPlayerCount', 'gDeveloper', 'gPublisher'].includes(name)
          ? Number(value)
          : value,
    }));
  };

  const handleInsert = async () => {
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGame),
      });

      if (!response.ok) {
        throw new Error('Failed to insert game.');
      }

      await fetchGames(); // Refresh the games list
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error inserting game:', error);
      setError((error as Error).message);
    }
  };

  const handleDelete = async (gID: number) => {
    try {
      const response = await fetch(`/api/games?id=${gID}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Failed to delete game.');
      }

      await fetchGames(); // Refresh the games list
    } catch (error) {
      console.error('Error deleting game:', error);
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <h1>Games</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='border my-5'>
          <thead>
            <tr>
              <th className='border px-8'>ID</th>
              <th className='border'>Name</th>
              <th className='border px-5'>Genre</th>
              <th className='border px-5'>Developer</th>
              <th className='border px-5'>Publisher</th>
              <th className='border px-5'>Release Date</th>
              <th className='border px-5'>Hours to Complete</th>
              <th className='border px-3'>Retail Price</th>
              <th className='border px-3'>Current Player Count</th>
              <th className='border px-3'>Max Player Count</th>
              <th className='border px-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.gID} className='text-center'>
                <td className='border'>{game.gID}</td>
                <td className='border px-2'>{game.gName}</td>
                <td className='border'>{game.gGenre}</td>
                <td className='border'>{game.gDeveloper}</td>
                <td className='border'>{game.gPublisher}</td>
                <td className='border'>{game.gReleaseDate}</td>
                <td className='border'>{game.gHoursToComplete}</td>
                <td className='border'>{game.gRetailPrice}</td>
                <td className='border'>{game.gCurrentPlayerCount}</td>
                <td className='border'>{game.gMaxPlayerCount}</td>
                <td className='border'>
                  <button
                    className='bg-red-500 text-white px-4 py-1 rounded'
                    onClick={() => handleDelete(game.gID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className='flex flex-row text-black'>
        <button
          className='mx-2 p-2 bg-white hover:bg-white/75'
          onClick={() => setIsModalOpen(true)}
        >
          Insert
        </button>
        <button
          className='mx-2 p-2 bg-white hover:bg-white/75'
          onClick={fetchGames}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed top-0 text-black left-0 w-full h-full bg-black/50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
            <h2>Insert a New Game</h2>
            <div>
              {Object.keys(newGame).map((key) => (
                <input
                  key={key}
                  name={key}
                  value={newGame[key as keyof typeof newGame] as string | number}
                  onChange={handleInputChange}
                  placeholder={key}
                  className='border w-full my-2 p-2'
                />
              ))}
            </div>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
              onClick={handleInsert}
            >
              Submit
            </button>
            <button
              className='bg-gray-500 text-white px-4 py-2 rounded'
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
