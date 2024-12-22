'use client'

import { useEffect, useState } from 'react';

// Define the type for the user
interface Games {
  gID: number;
  gName: string;
  gGenre: string;
  gDeveloper: number;
  gPublisher: number;
  gReleaseDate: string;
  gHoursToComplete: number;
  gRetailPrice: number;
}

export default function Users() {
  const [games, setGames] = useState<Games[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('/api/games')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then((data) => {
        setGames(data);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <h1 className=''>Games</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table className='border'>
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
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}