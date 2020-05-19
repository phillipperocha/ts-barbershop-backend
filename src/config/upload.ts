import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

interface IStorageInterface {
  local: {
    storage: multer.StorageEngine;
    uploadFolder: string;
    tmpFolder: string;
  };
}

const storageTypes: IStorageInterface = {
  local: {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', 'tmp'),
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(24).toString('HEX');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
    uploadFolder: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    tmpFolder: path.resolve(__dirname, '..', '..', 'tmp'),
  },
};

export default storageTypes.local;
