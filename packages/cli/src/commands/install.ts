import {
  createAdapter,
  type TargetIDE,
  getSupportedIDEs,
  getImplementedIDEs
} from "@ai-dev-kit/adapters";

/**
 * 安装选项
 */
export interface InstallOptions {
  /** 目标 IDE */
  target?: TargetIDE;
  /** 是否强制覆盖 */
  force?: boolean;
  /** 自定义安装目录 */
  targetDir?: string;
}

/**
 * 安装 AI-Dev-Kit 到目标 IDE
 */
export async function installCommand(options: InstallOptions = {}): Promise<void> {
  const supportedIDEs = getSupportedIDEs();
  const implementedIDEs = getImplementedIDEs();

  // 如果指定了 target，验证并安装单个 IDE
  if (options.target) {
    const target = options.target;

    if (!supportedIDEs.includes(target)) {
      console.error(`\n❌ 不支持的目标 IDE: ${target}`);
      console.error(`支持的 IDE: ${supportedIDEs.join(', ')}\n`);
      process.exit(1);
    }

    if (!implementedIDEs.includes(target)) {
      console.error(`\n❌ ${target} 适配器尚未实现`);
      console.error(`已实现的 IDE: ${implementedIDEs.join(', ')}\n`);
      process.exit(1);
    }

    await installToIDE(target, options);
    return;
  }

  // 没有指定 target，安装所有已实现的 IDE
  console.log(`\n🚀 安装 AI-Dev-Kit 到所有支持的 IDE (${implementedIDEs.join(', ')})...\n`);

  let successCount = 0;
  let failCount = 0;
  const failures: Array<{ ide: string; error: string }> = [];

  for (const ide of implementedIDEs) {
    console.log(`${'='.repeat(60)}`);
    console.log(`正在安装到 ${ide.toUpperCase()}...`);
    console.log('='.repeat(60) + '\n');

    try {
      await installToIDE(ide as TargetIDE, options);
      successCount++;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`\n❌ 安装到 ${ide} 失败: ${errorMsg}\n`);
      failCount++;
      failures.push({ ide, error: errorMsg });
    }
  }

  // 打印总结
  console.log(`\n${'='.repeat(60)}`);
  console.log('安装总结');
  console.log('='.repeat(60));
  console.log(`✓ 成功: ${successCount} 个`);
  if (failCount > 0) {
    console.log(`✗ 失败: ${failCount} 个`);
    console.log('\n失败详情:');
    for (const { ide, error } of failures) {
      console.log(`  - ${ide}: ${error}`);
    }
  }
  console.log('');

  if (failCount > 0 && successCount === 0) {
    // 全部失败
    process.exit(1);
  }
}

/**
 * 安装到指定的 IDE
 */
async function installToIDE(target: TargetIDE, options: InstallOptions): Promise<void> {
  try {
    // 创建适配器
    const adapter = createAdapter(target, {
      force: options.force,
      targetDir: options.targetDir,
    });

    // 执行安装
    const result = await adapter.install();

    if (!result.success) {
      throw new Error(result.message);
    }

    console.log(result.message);
    console.log('');

  } catch (error) {
    throw new Error(`安装失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}
