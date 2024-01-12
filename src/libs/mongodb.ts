import mongoose from 'mongoose';
import Logger from './logger';

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://admin:W8k8ZwFmSGfYVkay@ac-xoclsjj-shard-00-00.g7pfgmy.mongodb.net:27017,ac-xoclsjj-shard-00-01.g7pfgmy.mongodb.net:27017,ac-xoclsjj-shard-00-02.g7pfgmy.mongodb.net:27017/test?ssl=true&replicaSet=atlas-3kilsq-shard-0&authSource=admin&retryWrites=true&w=majority';

export default function connect() {
  const logger = Logger.create('mongodb');
  const db = mongoose.connection;
  db.on('connecting', () => {
    logger.info('connecting to MongoDB...');
  });

  db.on('error', (error: any) => {
    logger.error(`Error in MongoDb connection: ${error.message}`);
    mongoose.disconnect();
  });
  db.on('connected', () => {
    logger.info('MongoDB connected!');
  });
  db.once('open', () => {
    logger.info('MongoDB connection opened!');
  });
  db.on('reconnected', () => {
    logger.info('MongoDB reconnected!');
  });
  db.on('disconnected', async () => {
    logger.info('MongoDB disconnected!');
    await wait(2000);
    try {
      await mongoose.connect(MONGO_URI, {});
    } catch (e: any) {
      logger.error(e.message);
    }
  });

  mongoose.connect(MONGO_URI, {});
}
