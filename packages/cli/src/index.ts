#!/usr/bin/env bun

import { parseArgs } from "util";
import { processCommand } from "./commands/process";
import { processorsCommand } from "./commands/processors";
import { commandsCommand } from "./commands/commands";
import { initCommand } from "./commands/init";
import { installCommand } from "./commands/install";
import { versionCommand } from "./commands/version";

const USAGE = `
AI-Dev-Kit CLI v0.1.0

Usage: ai-dev-kit <command> [options]

Commands:
  install [options]          安装 AI-Dev-Kit 到 IDE
  process <prompt>           处理一个 prompt（测试用）
  processors list            列出所有处理器
  processors enable <name>   启用指定处理器
  processors disable <name>  禁用指定处理器
  commands list             列出所有可用命令
  init                      初始化配置文件
  version                   显示版本信息
  help                      显示帮助信息

Options:
  --target=IDE              指定目标 IDE (claude, cursor)
                            不指定则安装到所有已实现的 IDE
  --force                   强制覆盖已存在的文件

Examples:
  ai-dev-kit install                      # 安装到所有 IDE (claude + cursor)
  ai-dev-kit install --target=claude      # 只安装到 Claude Code
  ai-dev-kit install --target=cursor      # 只安装到 Cursor
  ai-dev-kit process "Hello World :zh"    # 测试处理器
  ai-dev-kit processors list
  ai-dev-kit commands list

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
      case 'install': {
        // 解析选项
        const options: any = {};
        for (const arg of args.slice(1)) {
          if (arg.startsWith('--target=')) {
            options.target = arg.split('=')[1];
          } else if (arg === '--force') {
            options.force = true;
          } else if (arg.startsWith('--')) {
            console.error(`错误: 未知选项 '${arg}'`);
            process.exit(1);
          }
        }
        await installCommand(options);
        break;
      }

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
