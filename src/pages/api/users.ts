import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '../../lib/oracle';  // Import the AppDataSource
import { User } from '../../entities/PUser';  // Import the User entity

// Define the handler function for the GET request to fetch users
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if TypeORM is initialized, and initialize if it's not
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // Get the user repository to interact with the User table
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();  // Fetch all users

    console.log('Fetched users:', users);  // Debugging line to check the response
    res.status(200).json(users);  // Send users as JSON response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });  // Error response
  }
}
