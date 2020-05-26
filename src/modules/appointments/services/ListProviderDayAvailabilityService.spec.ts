import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the available appointments of the day from a provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      // E vamos mudar a hora dos outros agendamentos para o teste
      // esse pras 14h
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    // esse pras 15h
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    // E aqui dentro vamos espionar o objeto date no método now
    // E vamos mockar como fizemos antes
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      // E vamos mockar pra retornar uma hora específica
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    // E agora vamos mudar
    expect(availability).toEqual(
      expect.arrayContaining([
        // A hora do NOW é após 11 horas então vamos mudar
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ])
    );
  });
});
