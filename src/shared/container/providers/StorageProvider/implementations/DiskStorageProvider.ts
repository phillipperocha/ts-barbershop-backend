import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(filename: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, filename),
      path.resolve(uploadConfig.uploadFolder, filename)
    );

    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(uploadConfig.uploadFolder, filename);

    try {
      await fs.promises.stat(filePath);
    } catch {
      throw new AppError('File does not exists.');
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
