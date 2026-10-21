// ecosystem.config.js — ForNothing blog (xhblogs) PM2 进程定义
// 密钥放在 /root/xhblogs.env（chmod 600，位于仓库之外），这里只负责加载。
const fs = require('fs');

function loadEnv(file) {
  const env = {};
  try {
    const text = fs.readFileSync(file, 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  } catch (e) {
    // 文件不存在时忽略
  }
  return env;
}

const env = Object.assign({
  NODE_ENV: 'production',
  PATH: '/usr/local/bin:/usr/local/lib/nodejs/node-v20.18.1-linux-x64/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
}, loadEnv('/root/xhblogs.env'));

module.exports = {
  apps: [
    {
      name: 'xhblogs',
      cwd: '/root/XinghuisamaBlogs/XHBlogs',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      env,
    },
  ],
};