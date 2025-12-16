# Claude Code Hooks

这是一个 Claude Code 的 UserPromptSubmit hook，用于增强提示词功能，支持命令快捷方式、Linear 集成和多方案生成。

## 功能特性

### 1. 命令快捷方式

使用简短的命令后缀快速添加指令前缀，无需每次输入完整的提示词。

**使用方法**: `任务内容 :命令`

**可用命令**:

| 命令 | 说明 | 示例 |
|------|------|------|
| `:zh` | 翻译为中文 | `Hello World :zh` |
| `:en` | 翻译为英文 | `你好世界 :en` |
| `:plan` | 生成分步计划 | `实现用户登录功能 :plan` |
| `:explain` | 通俗易懂解释 | `什么是闭包 :explain` |
| `:summarize` | 总结内容 | `@article.md :summarize` |
| `:analyze` | 分析问题 | `系统性能下降 :analyze` |
| `:improve` | 文本润色 | `优化这段文案 :improve` |
| `:code` | 代码编写 | `快速排序算法 :code` |
| `:comment` | 添加注释 | `@utils.ts :comment` |
| `:debug` | 调试分析 | `函数返回 undefined :debug` |
| `:refactor` | 代码重构 | `@legacy.js :refactor` |
| `:test` | 生成测试用例 | `@auth.ts :test` |
| `:document` | 生成技术文档 | `@api.ts :document` |
| `:review` | 代码审查 | `@component.tsx :review` |

### 2. Linear 集成

快速引用 Linear issue 数据，自动获取完整的 issue 信息。

**使用方法**: `linear(issueId)`

**示例**:
```
修复 linear(TEAM-123) 中描述的 bug
```

会自动将 `linear(TEAM-123)` 替换为该 issue 的完整 JSON 数据，包括标题、描述、状态等信息。

**配置**: 需要在 `~/.claude/.env` 中设置 `LINEAR_API_KEY`

### 3. 多方案生成

生成多个不同的解决方案，用于探索不同的实现思路。

**使用方法**: `任务描述 v(数量)`

**示例**:
```
实现用户认证 v(3)
```

会生成 3 个不同的用户认证实现方案。

## 安装和配置

### 1. 安装依赖

```bash
bun install
```

### 2. 配置环境变量

创建 `~/.claude/.env` 文件并添加:

```bash
LINEAR_API_KEY=your_linear_api_key_here
```

### 3. 配置 Claude Code

此 hook 会在用户提交提示词时自动运行，无需手动执行。

## 处理流程

UserPromptSubmit hook 按以下顺序处理用户输入:

1. **Linear 引用处理** (`linearProcessor`) - 替换 `linear(issueId)` 为实际数据
2. **命令处理** (`commandProcessor`) - 识别并展开命令快捷方式
3. **多方案处理** (`variationProcessor`) - 处理 `v(n)` 语法

## 开发说明

本项目使用 [Bun](https://bun.com) 运行时构建。查看 `CLAUDE.md` 了解更多 Bun 最佳实践。

### 项目结构

```
hooks/
├── UserPromptSubmit.ts      # Hook 主入口
├── processors/              # 处理器目录
│   ├── commandProcessor.ts  # 命令快捷方式处理
│   ├── linearProcessor.ts   # Linear 集成处理
│   └── variationProcessor.ts # 多方案生成处理
└── config/
    └── commands.ts          # 命令配置
```

### 添加新命令

编辑 `config/commands.ts` 文件:

```typescript
export const COMMANDS = {
  ':your-command': {
    prefix: '你的指令前缀：',
    description: '命令描述'
  }
}
```
