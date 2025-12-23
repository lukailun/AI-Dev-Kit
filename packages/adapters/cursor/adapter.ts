/**
 * Cursor Adapter (待实现)
 *
 * TODO: 研究 Cursor 的 hook 机制并实现适配器
 */

import { IDEAdapter, AdapterConfig, InstallResult } from "../shared";

export class CursorAdapter extends IDEAdapter {
  getInstallPath(): string {
    throw new Error("Cursor adapter 尚未实现");
  }

  generateHook(): string {
    throw new Error("Cursor adapter 尚未实现");
  }

  generatePackageJson(): string {
    throw new Error("Cursor adapter 尚未实现");
  }

  async install(): Promise<InstallResult> {
    throw new Error("Cursor adapter 尚未实现");
  }

  async installDependencies(targetDir: string): Promise<void> {
    throw new Error("Cursor adapter 尚未实现");
  }
}
