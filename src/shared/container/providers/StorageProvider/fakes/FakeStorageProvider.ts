import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(filename: string): Promise<string> {
    this.storage.push(filename);

    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === filename
    );

    this.storage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
