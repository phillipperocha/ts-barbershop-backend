import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findByDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    );

    const appoiontmentsStartHour = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + appoiontmentsStartHour
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      );

      const appointmentDateTime = new Date(year, month - 1, day, hour);

      return {
        hour,
        available:
          !hasAppointmentInHour && isAfter(appointmentDateTime, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
