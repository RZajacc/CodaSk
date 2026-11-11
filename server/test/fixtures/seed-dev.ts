import mongoose from 'mongoose';
import { seedSampleData } from './seed-sample-data';

const localDevelopmentUri = 'mongodb://127.0.0.1:27017/codask-dev';

async function main(): Promise<void> {
  const connection = mongoose.createConnection(localDevelopmentUri);
  try {
    await connection.asPromise();
    await seedSampleData(connection);
    console.log('Sample data seeded in the local codask-dev database.');
  } finally {
    await connection.close();
  }
}

main().catch((error: unknown) => {
  console.error('Failed to seed local development data:', error);
  process.exitCode = 1;
});
