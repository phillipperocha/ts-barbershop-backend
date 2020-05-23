import { container } from 'tsyringe';

import IStoragePRovider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStoragePRovider>(
  'StorageProvider',
  DiskStorageProvider
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
);
