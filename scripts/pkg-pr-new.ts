import { execa } from '@umijs/utils';
import path from 'path';
import { getExamples, getPublishPackages } from './miscUtil';

const rootPath = path.join(__dirname, '..');

function main() {
  // https://github.com/stackblitz-labs/pkg.pr.new
  const params = [
    // packages
    ...getPublishPackages().map((pkg) => pkg.path),
    // template
    ...getExamples().map((example) => `--template=${example.path}`),
    // more options
    '--pnpm',
  ];

  console.log('🚀 pkg-pr-new', params);

  execa.execaSync('npx', ['pkg-pr-new', 'publish', ...params], {
    stdio: 'inherit',
    cwd: rootPath,
  });
}

// \\\\\\\\\\\
//  \\\ main \\
//   \\\\\\\\\\\
main();
