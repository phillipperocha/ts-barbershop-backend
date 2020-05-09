import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
// Importaremos o model de Appointment
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date)
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is alredy booked.' });
  }

  // E agora vamos instanciar o objeto Appointment
  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointments);
});

export default appointmentsRouter;
