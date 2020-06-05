interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'noreply@phillrocha.com',
      name: '[BarberShop] Barbershop Team',
    },
  },
} as IMailConfig;
