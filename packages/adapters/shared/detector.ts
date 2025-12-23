/**
 * IDE 检测工具
 */

import { existsSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import type { TargetIDE } from "./types";

/**
 * 检测 Claude Code 是否可用
 */
export function detectClaude(): boolean {
  const claudeHome = join(homedir(), '.claude');
  return existsSync(claudeHome);
}

/**
 * 检测 Cursor 是否可用
 */
export function detectCursor(): boolean {
  // TODO: 确定 Cursor 的配置目录
  const cursorHome = join(homedir(), '.cursor');
  return existsSync(cursorHome);
}

/**
 * 检测所有可用的 IDE
 */
export function detectAvailableIDEs(): TargetIDE[] {
  const available: TargetIDE[] = [];

  if (detectClaude()) {
    available.push('claude');
  }

  if (detectCursor()) {
    available.push('cursor');
  }

  return available;
}

/**
 * 检测特定 IDE 是否可用
 */
export function detectIDE(target: TargetIDE): boolean {
  switch (target) {
    case 'claude':
      return detectClaude();
    case 'cursor':
      return detectCursor();
    default:
      return false;
  }
}
