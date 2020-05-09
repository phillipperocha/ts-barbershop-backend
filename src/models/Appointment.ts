class Appointment {
  id: string;

  provider: string;

  date: Date;

  // O typescript tem uma função helper chamada Omit que
  // receberá os generics informando a classe para se basear
  // em seguida quais os parâmetros que queremos omitir.

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = (Math.random() * 1000000).toFixed();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
