import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindByMonthFromProviderDTO from '@modules/appointments/dtos/IFindByMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByMonthFromProvider(
    data: IFindByMonthFromProviderDTO
  ): Promise<Appointment[]>;
}
