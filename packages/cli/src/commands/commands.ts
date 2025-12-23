import { COMMANDS, CODE_DEVELOPMENT, TEXT_PROCESSING, TRANSLATION } from "@ai-dev-kit/hooks/commands";

/**
 * 命令列表命令
 */
export async function commandsCommand(subcommand: string | undefined): Promise<void> {
  if (!subcommand || subcommand === 'list') {
    listCommands();
    return;
  }

  console.error(`错误: 未知的子命令 '${subcommand}'`);
  console.log('\n可用的子命令:');
  console.log('  list    列出所有命令');
  process.exit(1);
}

/**
 * 列出所有命令
 */
function listCommands(): void {
  console.log('\n可用的命令:\n');

  // 翻译类
  console.log('\x1b[1m翻译类\x1b[0m');
  printCommandGroup(TRANSLATION);

  // 代码开发类
  console.log('\n\x1b[1m代码开发类\x1b[0m');
  printCommandGroup(CODE_DEVELOPMENT);

  // 文本处理类
  console.log('\n\x1b[1m文本处理类\x1b[0m');
  printCommandGroup(TEXT_PROCESSING);

  // 使用示例
  console.log('\n\x1b[1m使用示例:\x1b[0m');
  console.log('  ai-dev-kit process "Hello World :zh"');
  console.log('  ai-dev-kit process "Sort array :code"');
  console.log('  ai-dev-kit process "Long document :summary"');
  console.log('  ai-dev-kit process "Design API v(3) :plan"\n');
}

/**
 * 打印命令组
 */
function printCommandGroup(commands: Record<string, { prefix: string; description: string }>): void {
  const entries = Object.entries(commands);
  const maxKeyLength = Math.max(...entries.map(([key]) => key.length));

  entries.forEach(([key, { description }]) => {
    const padding = ' '.repeat(maxKeyLength - key.length + 2);
    console.log(`  \x1b[36m${key}\x1b[0m${padding}${description}`);
  });
}
