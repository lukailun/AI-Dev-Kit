import { AVAILABLE_PROCESSORS } from "@ai-dev-kit/hooks";

/**
 * 处理器管理命令
 */
export async function processorsCommand(subcommand: string | undefined, args: string[]): Promise<void> {
  if (!subcommand || subcommand === 'list') {
    listProcessors();
    return;
  }

  switch (subcommand) {
    case 'enable':
      enableProcessor(args[0]);
      break;

    case 'disable':
      disableProcessor(args[0]);
      break;

    default:
      console.error(`错误: 未知的子命令 '${subcommand}'`);
      console.log('\n可用的子命令:');
      console.log('  list           列出所有处理器');
      console.log('  enable <name>  启用处理器');
      console.log('  disable <name> 禁用处理器');
      process.exit(1);
  }
}

/**
 * 列出所有处理器
 */
function listProcessors(): void {
  console.log('\n可用的处理器:\n');

  AVAILABLE_PROCESSORS.forEach(({ name, enabled }) => {
    const status = enabled !== false ? '✓ 已启用' : '✗ 已禁用';
    const statusColor = enabled !== false ? '\x1b[32m' : '\x1b[90m';
    const resetColor = '\x1b[0m';

    console.log(`  ${statusColor}${status}${resetColor}  ${name}`);
  });

  console.log('\n提示: 修改 packages/hooks/src/config.ts 来启用/禁用处理器\n');
}

/**
 * 启用处理器
 */
function enableProcessor(name: string | undefined): void {
  if (!name) {
    console.error('错误: 请提供处理器名称');
    console.log('\n使用方式: ai-dev-kit processors enable <name>');
    process.exit(1);
  }

  const processor = AVAILABLE_PROCESSORS.find(p => p.name === name);

  if (!processor) {
    console.error(`错误: 找不到处理器 '${name}'`);
    console.log('\n使用 "ai-dev-kit processors list" 查看所有可用处理器');
    process.exit(1);
  }

  console.log(`\n要启用处理器 '${name}'，请修改 packages/hooks/src/config.ts:\n`);
  console.log(`  {`);
  console.log(`    name: '${name}',`);
  console.log(`    processor: process${capitalize(name)},`);
  console.log(`    enabled: true  // 设置为 true`);
  console.log(`  }\n`);
}

/**
 * 禁用处理器
 */
function disableProcessor(name: string | undefined): void {
  if (!name) {
    console.error('错误: 请提供处理器名称');
    console.log('\n使用方式: ai-dev-kit processors disable <name>');
    process.exit(1);
  }

  const processor = AVAILABLE_PROCESSORS.find(p => p.name === name);

  if (!processor) {
    console.error(`错误: 找不到处理器 '${name}'`);
    console.log('\n使用 "ai-dev-kit processors list" 查看所有可用处理器');
    process.exit(1);
  }

  console.log(`\n要禁用处理器 '${name}'，请修改 packages/hooks/src/config.ts:\n`);
  console.log(`  {`);
  console.log(`    name: '${name}',`);
  console.log(`    processor: process${capitalize(name)},`);
  console.log(`    enabled: false  // 设置为 false`);
  console.log(`  }\n`);
}

/**
 * 首字母大写
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
