import { container } from 'tsyringe';

import IStoragePRovider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStoragePRovider>(
  'StorageProvider',
  DiskStorageProvider
);
