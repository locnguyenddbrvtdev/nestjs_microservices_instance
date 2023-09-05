import { SetMetadata } from '@nestjs/common';

// response_message
export const RESPONSE_MESSAGE = 'response_message';
export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE, message);

// Public API
export const IS_PUBLIC_KEY = 'is_public_key';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
