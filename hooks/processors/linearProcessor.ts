import { LinearClient } from "@linear/sdk";
import { config } from "dotenv";
import { join } from 'path';

config({ path: join(process.env.HOME ?? '~', '.claude', '.env') });

const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
});

/**
 * 处理 Linear issue 引用
 * 将 linear(issueId) 替换为实际的 issue 数据
 * 示例: linear(1000)
 */
export const processLinearReference = async (prompt: string): Promise<string> => {
  const linearMatch = prompt.match(/linear\((.*)\)/);
  if (!linearMatch) {
    return prompt;
  }

  const issueId = linearMatch[1];
  const issue = await linearClient.issue(issueId ?? '');
  return prompt.replace(
    `linear(${issueId})`,
    JSON.stringify(issue, null, 2)
  );
};
