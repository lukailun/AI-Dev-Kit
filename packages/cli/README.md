# @ai-dev-kit/cli

AI-Dev-Kit 的命令行工具，用于安装和测试 prompt 处理功能。

## 核心功能

### 1. 安装到 Claude Code

CLI 最主要的功能是**将 AI-Dev-Kit 安装到用户的 Claude Code 环境**：

```bash
bun run cli install
```

这会：
- 复制所有源文件到 `~/.claude/hooks`
- 自动修复导入路径（从 workspace 导入改为相对导入）
- 创建配置模板和依赖文件
- 提供后续配置指引

### 2. 测试处理器

在安装前，可以使用 CLI 测试各个处理器的功能。

## 安装

### 本地使用

```bash
# 在项目根目录
cd /path/to/ai-dev-kit

# 安装依赖
bun install

# 使用 CLI
bun run cli <command>
```

## 使用方式

### 安装到 Claude Code（最重要）

```bash
# 1. 运行安装命令
bun run cli install

# 2. 安装依赖
cd ~/.claude/hooks
bun install

# 3. 配置 settings.json（如输出提示）

# 4. 重启 Claude Code
```

安装完成后，在 Claude Code 中输入任何 prompt 都会自动经过处理器处理。

### 测试处理器（可选）

在安装前或安装后，可以使用 CLI 测试处理器：

```bash
# 查看帮助
bun run cli help

# 测试翻译
bun run cli process "Hello World :zh"

# 测试变体
bun run cli process "Sort array v(3)"

# 测试组合
bun run cli process "Design API v(2) :plan"
```

### 管理处理器

```bash
# 列出所有处理器
ai-dev-kit processors list

# 查看如何启用处理器
ai-dev-kit processors enable linear

# 查看如何禁用处理器
ai-dev-kit processors disable command
```

### 查看命令列表

```bash
# 列出所有可用命令
ai-dev-kit commands list
```

### 初始化配置

```bash
# 创建配置目录和文件
ai-dev-kit init
```

### 查看版本

```bash
ai-dev-kit version
```

## 命令参考

### process

处理一个 prompt 并输出结果。

```bash
ai-dev-kit process <prompt>
```

**示例:**
```bash
ai-dev-kit process "Hello World :zh"
# 输出: 将以下内容翻译成中文：Hello World

ai-dev-kit process "Sort array :code"
# 输出: 为以下需求编写代码：Sort array

ai-dev-kit process "Design API v(3)"
# 输出: 生成3种API设计方案
```

### processors

管理处理器。

```bash
# 列出所有处理器及其状态
ai-dev-kit processors list

# 查看如何启用处理器
ai-dev-kit processors enable <name>

# 查看如何禁用处理器
ai-dev-kit processors disable <name>
```

**可用的处理器:**
- `linear` - Linear Issue 集成
- `command` - 命令处理（:zh, :code 等）
- `variation` - 变体生成（v(n)）

### commands

列出所有可用的命令。

```bash
ai-dev-kit commands list
```

**命令分类:**
- **翻译类**: `:zh`, `:en`
- **代码开发类**: `:code`, `:debug`, `:review`, `:test`, `:refactor`, `:comment`, `:document`
- **文本处理类**: `:analyze`, `:explain`, `:improve`, `:plan`, `:summarize`

### init

初始化 AI-Dev-Kit 配置。

```bash
ai-dev-kit init
```

**创建的文件:**
- `~/.claude/.env` - 环境变量配置
- `~/.claude/prompts/variations.md` - 变体生成模板

### version

显示版本信息。

```bash
ai-dev-kit version
```

## 配置

### 环境变量

在 `~/.claude/.env` 中配置：

```env
# Linear API Key（可选）
LINEAR_API_KEY=your_api_key_here
```

### 自定义 Claude Home

```bash
export CLAUDE_HOME=/path/to/custom/claude/home
ai-dev-kit init
```

## 使用示例

### 翻译文本

```bash
ai-dev-kit process "Hello, World :zh"
# 将以下内容翻译成中文：Hello, World

ai-dev-kit process "你好世界 :en"
# Translate to English: 你好世界
```

### 代码开发

```bash
ai-dev-kit process "Create a function to sort an array :code"
# 为以下需求编写代码：Create a function to sort an array

ai-dev-kit process "Review this authentication logic :review"
# 审查以下代码：Review this authentication logic
```

### 生成多种方案

```bash
ai-dev-kit process "Design a user authentication system v(3)"
# 为以下指令生成 3 种可能的解决方案：
# Design a user authentication system
```

### 组合使用

```bash
ai-dev-kit process "Implement rate limiting v(2) :code"
# 1. 先生成2种方案
# 2. 然后添加代码编写前缀
```

## 开发

### 运行开发版本

```bash
cd packages/cli
bun run dev <command>
```

### 构建

```bash
cd packages/cli
bun run build
```

## 故障排除

### 无法找到 @ai-dev-kit/hooks

**原因**: 未在根目录安装依赖

**解决方法**:
```bash
cd /path/to/ai-dev-kit
bun install
```

### Linear 集成不工作

**检查**:
1. `~/.claude/.env` 文件存在
2. `LINEAR_API_KEY` 正确配置
3. 运行 `ai-dev-kit init` 创建配置

## 许可证

MIT
