import mongoose from 'mongoose';
import { seedSampleData } from './seed-sample-data';

// Use the local development database so sample data cannot be seeded elsewhere.
const localDevelopmentUri = 'mongodb://127.0.0.1:27017/codask-dev';

async function main(): Promise<void> {
  // Open a dedicated connection and wait for it to be ready before seeding.
  const connection = mongoose.createConnection(localDevelopmentUri);
  try {
    await connection.asPromise();
    // Insert the shared sample dataset into the connected database.
    await seedSampleData(connection);
    console.log('Sample data seeded in the local codask-dev database.');
  } finally {
    // Close the connection whether seeding succeeds or fails.
    await connection.close();
  }
}

// Log any failure and mark the process as unsuccessful for calling scripts.
main().catch((error: unknown) => {
  console.error('Failed to seed local development data:', error);
  process.exitCode = 1;
});
