import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    // Vamos pegar os dados em cache
    const cacheData = await this.cacheProvider.recover('dasda');

    console.log(cacheData);

    const appointments = await this.appointmentsRepository.findByDayFromProvider(
      { provider_id, year, month, day }
    );

    // E vamos salvar no cache
    // await this.cacheProvider.save('dasda', 'dasda');

    return appointments;
  }
}

export default ListProviderAppointmentsService;
