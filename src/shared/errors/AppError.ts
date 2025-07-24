export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = 'AppError';
    
    // This is needed to properly extend Error in TypeScript
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
