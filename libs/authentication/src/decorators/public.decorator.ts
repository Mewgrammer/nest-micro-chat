import { SetMetadata } from '@nestjs/common';

export const PUBLIC_DECORATOR_KEY = 'IS_PUBLIC_ENDPOINT';
export const Public = () => SetMetadata(PUBLIC_DECORATOR_KEY, true);
