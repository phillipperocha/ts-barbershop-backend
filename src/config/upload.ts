import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import fs from 'fs';

interface StorageInterface {
  local: {
    storage: multer.StorageEngine;
    directory: string;
    delete: Function;
  };
}

const storageTypes: StorageInterface = {
  local: {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', 'tmp'),
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(24).toString('HEX');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
    directory: path.resolve(__dirname, '..', '..', 'tmp'),
    delete: async (filename: string): Promise<void> => {
      const filePath = path.join(storageTypes.local.directory, filename);

      const fileExists = await fs.promises.stat;

      if (!fileExists) {
        throw new Error('File does not exists.');
      }

      await fs.promises.unlink(filePath);
    },
  },
};

export default {
  storage: storageTypes.local.storage,
  directory: storageTypes.local.directory,
  delete: storageTypes.local.delete,
};
