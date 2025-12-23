/**
 * 共享工具函数
 */

import { existsSync } from "fs";
import { homedir } from "os";
import { join } from "path";

/**
 * 获取用户主目录
 */
export function getHomeDir(): string {
  return homedir();
}

/**
 * 检查目录是否存在
 */
export function dirExists(path: string): boolean {
  return existsSync(path);
}

/**
 * 获取项目根目录
 */
export function getProjectRoot(): string {
  const cliFile = import.meta.url.replace('file://', '');
  let current = cliFile;

  // 向上查找直到找到 package.json 包含 workspaces
  while (current !== '/') {
    const parent = join(current, '..');
    const packageJsonPath = join(parent, 'package.json');

    if (existsSync(packageJsonPath)) {
      const pkg = require(packageJsonPath);
      if (pkg.workspaces) {
        return parent;
      }
    }

    current = parent;
  }

  throw new Error('无法找到项目根目录');
}
