import { Router } from 'express';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
  // Vamos fazer apenas uma rota de teste
  // provider é o prestador de serviço, date
  const { provider, date } = request.body;

  const appointment = {
    id: Math.random() * 10000,
    provider,
    date,
  };

  appointments.push(appointment);

  return response.json(appointments);
});

export default appointmentsRouter;
