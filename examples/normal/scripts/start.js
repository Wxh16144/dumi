const path = require('path');
const { execSync } = require('child_process');
const del = require('del');
const pkgDir = require('pkg-dir');

const baseDir = process.cwd();

const resolvePkg = (packageName) =>
  pkgDir.sync(path.dirname(require.resolve(packageName)));

const args = process.argv.slice(2);

const wuxhPkg = path.join(resolvePkg('@wuxh/dumi'), 'bin/dumi.js');
const oldPkg = path.resolve(__dirname, '../../../bin/dumi.js');

function main() {
  const firstArg = args[0];

  if (['old', 'wuxh'].includes(firstArg)) {
    // del 删除 .dumi/temp* 临时文件
    del.sync(path.resolve(__dirname, '../.dumi/tmp*'));

    const restArgs = args.slice(1);
    const pkg = firstArg === 'old' ? oldPkg : wuxhPkg;
    execSync(`node ${pkg} ${restArgs.join(' ')}`, { stdio: 'inherit' });
  } else {
    throw new Error('firstArg is not in [old, wuxh]');
  }
}

try {
  main();
} catch (e) {
  console.error(e);
  process.exit(1);
}
