import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindByMonthFromProviderDTO from '@modules/appointments/dtos/IFindByMonthFromProviderDTO';
import IFindByDayFromProviderDTO from '@modules/appointments/dtos/IFindByDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByMonthFromProvider(
    data: IFindByMonthFromProviderDTO
  ): Promise<Appointment[]>;
  findByDayFromProvider(
    data: IFindByDayFromProviderDTO
  ): Promise<Appointment[]>;
}
