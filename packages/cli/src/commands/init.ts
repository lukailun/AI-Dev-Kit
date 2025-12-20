import { getClaudeHome, getClaudeEnvPath, getClaudePromptsPath } from "@ai-dev-kit/core/utils";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

/**
 * 初始化配置命令
 */
export async function initCommand(): Promise<void> {
  console.log('\n初始化 AI-Dev-Kit 配置...\n');

  const claudeHome = getClaudeHome();
  const envPath = getClaudeEnvPath();
  const promptsPath = getClaudePromptsPath();

  try {
    // 创建 .claude 目录
    if (!existsSync(claudeHome)) {
      await mkdir(claudeHome, { recursive: true });
      console.log(`✓ 创建目录: ${claudeHome}`);
    } else {
      console.log(`✓ 目录已存在: ${claudeHome}`);
    }

    // 创建 prompts 目录
    if (!existsSync(promptsPath)) {
      await mkdir(promptsPath, { recursive: true });
      console.log(`✓ 创建目录: ${promptsPath}`);
    } else {
      console.log(`✓ 目录已存在: ${promptsPath}`);
    }

    // 创建 .env 文件
    if (!existsSync(envPath)) {
      const envTemplate = `# AI-Dev-Kit 环境变量配置
# Linear API Key (可选 - 用于 Linear 集成)
# LINEAR_API_KEY=your_linear_api_key_here
`;
      await writeFile(envPath, envTemplate, 'utf-8');
      console.log(`✓ 创建文件: ${envPath}`);
    } else {
      console.log(`✓ 文件已存在: ${envPath}`);
    }

    // 创建 variations.md 模板
    const variationsPath = join(promptsPath, 'variations.md');
    if (!existsSync(variationsPath)) {
      const variationsTemplate = `为以下指令生成 {n} 种可能的解决方案：

每个方案请按照以下模板格式输出：

## 方案 $n

### 实现步骤：
1. ...
2. ...
3. ...

### 设计思路：
...

### 权衡优劣：
...

---

指令：{task}
`;
      await writeFile(variationsPath, variationsTemplate, 'utf-8');
      console.log(`✓ 创建文件: ${variationsPath}`);
    } else {
      console.log(`✓ 文件已存在: ${variationsPath}`);
    }

    console.log('\n初始化完成！\n');
    console.log('下一步:');
    console.log(`  1. 编辑 ${envPath} 配置环境变量`);
    console.log(`  2. 使用 "ai-dev-kit process <prompt>" 开始处理 prompt\n`);

  } catch (error) {
    console.error('\n初始化失败:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
