import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgottenPasswordEmailService from '@modules/users/services/SendForgottenPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgottenPasswordEmail = container.resolve(
      SendForgottenPasswordEmailService
    );

    await sendForgottenPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
