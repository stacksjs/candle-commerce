import type { CAC } from 'cac';
import type { CliOptions, LogOptions } from './cli-types';
import type { Logger } from '../logger';

export type { CliOptions, Logger, LogOptions }
export declare function createCli(options: { logDirectory?: string } = {
  logDirectory: 'logs',
}): Promise<CAC>;