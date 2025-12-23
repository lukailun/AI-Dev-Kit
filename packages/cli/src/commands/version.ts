/**
 * 版本信息命令
 */
export function versionCommand(): void {
  const version = '0.1.0';

  console.log(`
AI-Dev-Kit CLI v${version}

Packages:
  @ai-dev-kit/core     v${version}
  @ai-dev-kit/hooks    v${version}
  @ai-dev-kit/adapters v${version}
  @ai-dev-kit/cli      v${version}

Runtime: Bun ${Bun.version}
  `);
}
