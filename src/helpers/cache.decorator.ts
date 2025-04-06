import { SetMetadata } from '@nestjs/common/decorators/core/set-metadata.decorator';

export const CACHE_CONTROL_KEY = 'cache-control';
export const CacheControl = (maxAge: number) =>
  SetMetadata(CACHE_CONTROL_KEY, maxAge);
