import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '../../lib/oracle';  // Import the AppDataSource
import { Games } from '../../entities/Games';  // Import the User entity

// Define the handler function for the GET request to fetch users
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if TypeORM is initialized, and initialize if it's not
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // Get the user repository to interact with the User table
    const gamesRepository = AppDataSource.getRepository(Games);
    const games = await gamesRepository.find();  // Fetch all users

    console.log('Fetched users:', games);  // Debugging line to check the response
    res.status(200).json(games);  // Send users as JSON response
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Error fetching games' });  // Error response
  }
}
