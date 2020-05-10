import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  // Como utilizaremos await, o método execute() precisa ser assíncrono
  // E retornar uma promise
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is alredy booked');
    }

    // O método create() não salva por padrão só cria em memória
    const appointment = appointmentsRepository.create({
      provider,
      date,
    });

    // Precisamos utilizar o método .save() do appointmentsRepository
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
