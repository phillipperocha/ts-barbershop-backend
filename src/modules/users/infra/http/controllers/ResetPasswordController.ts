import { Request, Response } from 'express';
import { container } from 'tsyringe';

import PasswordResetService from '@modules/users/services/PasswordResetService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const passwordResetService = container.resolve(PasswordResetService);

    await passwordResetService.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
