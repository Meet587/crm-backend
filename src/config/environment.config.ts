import { registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { validationErrorsToArray } from '../helpers/utils';
import { Env } from './env';
import { CommonConfig } from './interfaces/common-config';
import { localEnv } from './sets/local.config';
import { prodEnv } from './sets/prod.config';

export const envMap = new Map<Env, () => CommonConfig>([
  [Env.LOCAL, localEnv],
  [Env.PRODUCTION, prodEnv],
]);

export const getConfig = (): CommonConfig => {
  const nodeEnv = process.env.NODE_ENV?.toLowerCase() as Env;
  const getEnvironment = envMap.get(nodeEnv);
  if (!getEnvironment) {
    throw new Error(`Configuration for NODE_ENV=${nodeEnv} not found.`);
  }
  const conf = plainToClass(CommonConfig, getEnvironment());
  const errors = validateSync(conf, {
    whitelist: true,
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
    groups: [nodeEnv],
  });
  if (errors.length) {
    throw new Error(validationErrorsToArray(errors).toString());
  }

  return conf;
};

export default registerAs('environment', getConfig);
