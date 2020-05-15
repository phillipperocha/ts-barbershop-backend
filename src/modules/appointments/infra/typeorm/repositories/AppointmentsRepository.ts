import { EntityRepository, Repository } from 'typeorm';

// Vamos importar a nossa interface
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
// E vamos dizer agora que a classe implementa a interface
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  // E vamo trocar o null que ele retorna por undefined
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: {
        date,
      },
    });

    // E aqui colocaremos só isso, porque já retornará undefined caso não encontre
    return findAppointment;
  }
}

export default AppointmentsRepository;
