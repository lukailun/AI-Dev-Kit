#!/usr/bin/env bun

import { parseArgs } from "util";
import { processCommand } from "./commands/process";
import { processorsCommand } from "./commands/processors";
import { commandsCommand } from "./commands/commands";
import { initCommand } from "./commands/init";
import { versionCommand } from "./commands/version";

const USAGE = `
AI-Dev-Kit CLI v0.1.0

Usage: ai-dev-kit <command> [options]

Commands:
  process <prompt>           处理一个 prompt
  processors list            列出所有处理器
  processors enable <name>   启用指定处理器
  processors disable <name>  禁用指定处理器
  commands list             列出所有可用命令
  init                      初始化配置文件
  version                   显示版本信息
  help                      显示帮助信息

Examples:
  ai-dev-kit process "Hello World :zh"
  ai-dev-kit processors list
  ai-dev-kit commands list
  ai-dev-kit init

更多信息请访问: https://github.com/your-org/ai-dev-kit
`;

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
    console.log(USAGE);
    process.exit(0);
  }

  const command = args[0];
  const subcommand = args[1];
  const restArgs = args.slice(2);

  try {
    switch (command) {
      case 'process':
        await processCommand(args.slice(1));
        break;

      case 'processors':
        await processorsCommand(subcommand, restArgs);
        break;

      case 'commands':
        await commandsCommand(subcommand);
        break;

      case 'init':
        await initCommand();
        break;

      case 'version':
        versionCommand();
        break;

      default:
        console.error(`错误: 未知命令 '${command}'`);
        console.log('\n使用 "ai-dev-kit help" 查看所有可用命令');
        process.exit(1);
    }
  } catch (error) {
    console.error('错误:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
