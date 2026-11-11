import { Connection } from 'mongoose';
import { sampleData } from './sample-data';

export async function seedSampleData(connection: Connection): Promise<void> {
  const db = connection.db;
  if (!db) {
    throw new Error(
      'Cannot seed sample data without an open database connection',
    );
  }

  for (const [collectionName, documents] of Object.entries(sampleData)) {
    const collection = db.collection(collectionName);
    for (const document of documents) {
      const existing = await collection.findOne({ _id: document._id });
      if (existing && existing.fixtureKey !== document.fixtureKey) {
        throw new Error(
          `Cannot seed ${collectionName}: fixture ID ${document._id.toHexString()} belongs to another document`,
        );
      }
    }
  }

  for (const [collectionName, documents] of Object.entries(sampleData)) {
    const collection = db.collection(collectionName);
    for (const document of documents) {
      await collection.updateOne(
        { _id: document._id, fixtureKey: document.fixtureKey },
        { $setOnInsert: document },
        { upsert: true },
      );
    }
  }
}
