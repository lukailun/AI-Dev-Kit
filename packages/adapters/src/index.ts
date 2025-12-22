/**
 * Adapter Factory
 * 根据目标 IDE 创建相应的适配器
 */

import { IDEAdapter, AdapterConfig } from "../shared";
import { ClaudeAdapter } from "../claude";
import { CursorAdapter } from "../cursor";

export type TargetIDE = 'claude' | 'cursor';

/**
 * 创建 IDE 适配器
 */
export function createAdapter(
  target: TargetIDE,
  config: AdapterConfig = {}
): IDEAdapter {
  switch (target) {
    case 'claude':
      return new ClaudeAdapter(config);
    case 'cursor':
      return new CursorAdapter(config);
    default:
      throw new Error(`不支持的目标 IDE: ${target}`);
  }
}

/**
 * 获取支持的 IDE 列表
 */
export function getSupportedIDEs(): TargetIDE[] {
  return ['claude', 'cursor'];
}

/**
 * 获取已实现的 IDE 列表
 */
export function getImplementedIDEs(): TargetIDE[] {
  return ['claude']; // cursor 尚未实现
}

// 导出类型和接口
export * from '../shared';
export { ClaudeAdapter } from '../claude';
export { CursorAdapter } from '../cursor';
export { detectAvailableIDEs, detectIDE, detectClaude, detectCursor } from '../shared/detector';
