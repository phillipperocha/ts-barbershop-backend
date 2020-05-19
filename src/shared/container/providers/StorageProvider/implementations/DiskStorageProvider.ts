// Vamos importar o fs do node
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(filename: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, filename),
      path.resolve(uploadConfig.uploadFolder, 'uploads', filename)
    );

    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(uploadConfig.uploadFolder, filename);

    const fileExists = await fs.promises.stat(filePath);

    if (!fileExists) {
      throw new Error('File does not exists.');
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
