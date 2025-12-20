#!/usr/bin/env bash

# AI-Dev-Kit CLI 安装脚本

set -e

echo "正在安装 AI-Dev-Kit CLI..."

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 创建可执行文件
BIN_DIR="$HOME/.local/bin"
mkdir -p "$BIN_DIR"

# 创建包装脚本
cat > "$BIN_DIR/ai-dev-kit" << EOF
#!/usr/bin/env bash
cd "$PROJECT_ROOT"
bun run packages/cli/src/index.ts "\$@"
EOF

# 添加执行权限
chmod +x "$BIN_DIR/ai-dev-kit"

echo "✓ 安装完成！"
echo ""
echo "确保 ~/.local/bin 在你的 PATH 中："
echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
echo ""
echo "现在可以使用："
echo "  ai-dev-kit process \"Hello :zh\""
echo "  ai-dev-kit commands list"
echo ""
