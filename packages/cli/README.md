# @ai-dev-kit/cli

AI-Dev-Kit 的命令行工具。

## 安装

### 本地使用

```bash
# 在项目根目录
cd /path/to/ai-dev-kit

# 安装依赖
bun install

# 使用 CLI
bun run packages/cli/src/index.ts <command>
```

### 全局安装（可选）

```bash
# 链接到全局
cd packages/cli
bun link

# 现在可以全局使用
ai-dev-kit <command>
```

## 使用方式

### 查看帮助

```bash
ai-dev-kit help
```

### 处理 Prompt

```bash
# 基础使用
ai-dev-kit process "Hello World :zh"

# 使用变体
ai-dev-kit process "Sort array v(3)"

# 组合使用
ai-dev-kit process "Design API v(2) :plan"
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
