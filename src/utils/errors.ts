import { Response } from 'express';

export function generateErrorJson(message: string) {
  return { error: { name: 'Authorization error', message } };
}

export function sendAuthentificationError(message: string, res: Response) {
  res.status(401).json(generateErrorJson(message));
}
