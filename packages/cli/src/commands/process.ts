import { getEnabledProcessors } from "@ai-dev-kit/hooks";

/**
 * 处理 prompt 命令
 */
export async function processCommand(args: string[]): Promise<void> {
  if (args.length === 0) {
    console.error('错误: 请提供要处理的 prompt');
    console.log('\n使用方式: ai-dev-kit process <prompt>');
    console.log('示例: ai-dev-kit process "Hello World :zh"');
    process.exit(1);
  }

  const prompt = args.join(' ');
  const processors = getEnabledProcessors();

  if (processors.length === 0) {
    console.warn('警告: 没有启用的处理器');
    console.log(prompt);
    return;
  }

  let result = prompt;

  for (const { name, processor } of processors) {
    try {
      result = await processor(result);
    } catch (error) {
      console.error(`处理器 '${name}' 执行失败:`, error instanceof Error ? error.message : String(error));
    }
  }

  console.log(result);
}
