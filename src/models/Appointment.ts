class Appointment {
  // Definimos os seus atributos
  id: string;

  provider: string;

  date: Date;

  // E seu método construtor
  constructor(provider: string, date: Date) {
    // Fazendo um ID fake
    this.id = (Math.random() * 1000000).toFixed();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
