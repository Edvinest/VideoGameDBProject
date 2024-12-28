import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '../../lib/oracle';
import { Games } from '../../entities/Games';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if TypeORM is initialized, and initialize if it's not
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const gamesRepository = AppDataSource.getRepository(Games);

    if (req.method === 'GET') {
      // Handle fetching all games
      const games = await gamesRepository.find();
      res.status(200).json(games);

    } else if (req.method === 'POST') {
      // Handle inserting a new game
      const newGameData = req.body;
      const newGame = gamesRepository.create(newGameData); // Create a new game entity
      await gamesRepository.save(newGame); // Save the entity to the database
      res.status(201).json(newGame);

    } else if (req.method === 'DELETE') {
      // Handle deleting a game by ID
      const { id } = req.query; // ID should be passed as a query parameter
      if (!id) {
        res.status(400).json({ message: 'Game ID is required for deletion.' });
        return;
      }

      const deleteResult = await gamesRepository.delete(id);
      if (deleteResult.affected === 0) {
        res.status(404).json({ message: 'Game not found.' });
      } else {
        res.status(200).json({ message: `Game with ID ${id} deleted successfully.` });
      }

    } else {
      // Method not allowed
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).json({ message: `Method ${req.method} not allowed.` });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
