class AppError {
  // Teremos duas propriedades
  public readonly message: string;

  public readonly statusCode: number; // Por exemplo 401, 404,

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
