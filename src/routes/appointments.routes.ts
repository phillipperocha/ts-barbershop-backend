import { Router } from 'express';
// Vamos importar duas funcionalidades do date-fns
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

// Precisamos utilizar tipagem no appointments através de uma interface
interface Appointment {
  id: number;
  provider: string;
  date: Date;
}

// E declaramos agora que a variável o tipo dela é um array de Appointments
const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  // Deixaremos a data no formato Iso e queremos no começo da hora dela
  const parsedDate = startOfHour(parseISO(date));

  // Verificaremos se há horários já marcados
  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date)
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is alredy booked.' });
  }

  const appointment = {
    id: Math.random() * 10000,
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);

  return response.json(appointments);
});

export default appointmentsRouter;
