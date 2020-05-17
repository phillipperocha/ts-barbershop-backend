import FakeAppointmentsRepository from '@modules/appointments/repositories/fake/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123132132132',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123132132132');
  });

  // 2o teste:
  // it('should not be able to create two appointment on the same time', () => {
  //   expect();
  // });
});
