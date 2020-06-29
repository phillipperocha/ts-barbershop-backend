import { startOfHour, getHours, isBefore, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError(`You can't create an appointment on a past date.`);
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        `You can only create an appointment between 8AM and 5PM.`
      );
    }

    if (user_id === provider_id) {
      throw new AppError(`You can't create an appointment to yourself.`);
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is alredy booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'at' HH:mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `New appointment for ${dateFormatted}.`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d'
      )}`
    );

    return appointment;
  }
}

export default CreateAppointmentService;
