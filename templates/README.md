# Templates 目录

此目录包含针对不同 IDE 的安装模板。

## 目录结构

- `claude/` - Claude Code 模板
  - `commands/` - Slash commands 定义
  - `prompts/` - Prompt 模板
  - `.env.template` - 环境变量模板
  - `package.template.json` - package.json 模板

- `cursor/` - Cursor 模板（待实现）

## 使用方式

这些模板会被 `packages/cli` 的 install 命令使用，根据 `--target` 参数选择相应的模板。

例如：
```bash
bun cli install --target=claude   # 使用 templates/claude/
bun cli install --target=cursor   # 使用 templates/cursor/
```
