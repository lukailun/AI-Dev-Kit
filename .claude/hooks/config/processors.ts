import { processCommand } from '../processors/commandProcessor';
import { processLinearReference } from '../processors/linearProcessor';
import { processVariation } from '../processors/variationProcessor';

export type Processor = (prompt: string) => string | Promise<string>;

export interface ProcessorConfig {
  name: string;
  processor: Processor;
  enabled?: boolean;
}

/**
 * 所有可用的 processors
 * 按执行顺序排列
 * 修改 enabled 字段来启用/禁用特定的 processor
 */
export const AVAILABLE_PROCESSORS: ProcessorConfig[] = [
  {
    name: 'linear',
    processor: processLinearReference,
    enabled: true
  },
  {
    name: 'command',
    processor: processCommand,
    enabled: true
  },
  {
    name: 'variation',
    processor: processVariation,
    enabled: true
  }
];

/**
 * 获取启用的 processors
 * 只返回 enabled 为 true 的 processors
 */
export function getEnabledProcessors(): ProcessorConfig[] {
  return AVAILABLE_PROCESSORS.filter(processor => processor.enabled !== false);
}
