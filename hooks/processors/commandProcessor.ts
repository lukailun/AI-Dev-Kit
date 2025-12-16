import { COMMANDS, type CommandKey } from "../config/commands";

const extractTask = (prompt: string, command: string) => {
  return prompt.slice(0, -command.length).trim();
};

/**
 * 处理命令前缀
 * 为以特定命令结尾的 prompt 添加对应的前缀
 * 示例: Hello :zh
 */
export const processCommand = (prompt: string): string => {
  const matchedCommand = (Object.keys(COMMANDS) as CommandKey[]).find(
    command => prompt.endsWith(command)
  );

  if (!matchedCommand) {
    return prompt;
  }

  const task = extractTask(prompt, matchedCommand);

  if (!task) {
    throw new Error('指令后没有提供具体内容');
  }

  return `${COMMANDS[matchedCommand].prefix}${task}`;
};
