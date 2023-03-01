const path = require('path');
const fs = require('fs');
const { Octokit } = require('@octokit/core');

// You can use it without a token, but there is a limit on the number of times
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const REPLACE_MESSAGE_MDX = [
  // remove mdx component import statements
  { type: 'replace', value: [/^[^\r\n]+ from 'umi';\n*/, ''] },
  // replace Message component
  {
    type: 'replace',
    value: [
      /<Message(?: type="[^"]+")? emoji="(?:🚨|⚠️)">([^]+?)<\/Message>/,
      ':::warning$1:::',
    ],
  },
  {
    type: 'replace',
    value: [
      /<Message(?: type="[^"]+")? emoji="(💡|🚀)">([^]+?)<\/Message>/,
      ':::info$1:::',
    ],
  },
];

const FILE_LIST = [
  // config docs
  {
    localname: 'config.md',
    path: 'docs/docs/api/config.md',
    actions: [
      ...REPLACE_MESSAGE_MDX,
      // remove head content
      { type: 'slice', value: [2] },
      // remove unnecessary option
      ...[
        'clientLoader',
        'cssLoaderModules',
        'mdx',
        'mpa',
        'monorepoRedirect',
        'reactRouter5Compat',
        'vite',
        'verifyCommit',
      ].map((option) => ({
        type: 'replace',
        value: [new RegExp(`(?:^|[\r\n])## ${option}[^]+?([\r\n]#|$)`), '$1'],
      })),
      // replace h2 -> h3
      { type: 'replace', value: [/(\n?)##/g, '\n###'] },
      // replace jsx to jsx | pure
      { type: 'replace', value: [/\n```(jsx|tsx)\s*\n/g, '\n```$1 | pure\n'] },
      // prepend internal link prefix
      // { type: 'replace', value: [/]\(\//g, '](https://umijs.org/'] },
      // prepend anchor link prefix
      // { type: 'replace', value: [/]\(#/g, '](https://umijs.org/docs/api/config#'] },
      // replace mfsu eager strategy
      { type: 'replace', value: [" strategy: 'normal' | 'eager';", ''] },
      {
        type: 'replace',
        value: ["{ mfName: 'mf', strategy: 'normal' }", "{ mfName: 'mf' }"],
      },
      { type: 'replace', value: [/- `strategy` 指定[^\n]+\n/, ''] },
      { type: 'replace', value: [/- `include` 仅在 `strategy[^\n]+\n/, ''] },
      // replace hash default
      { type: 'replace', value: [/(# hash[^]+?默认值：)`false`/g, '$1`true`'] },
      // replace exportStatic default
      {
        type: 'replace',
        value: [/(# exportStatic[^]+?默认值：)`undefined`/g, '$1`{}`'],
      },
      // replace metas
      { type: 'replace', value: [/('|")umi, umijs/g, '$1dumi, base on umi'] },
      // replace umi statement
      {
        type: 'replace',
        value: [/(额外的|，|。|让|删除)(\s?)umi/gi, '$1$2dumi'],
      },
      // replace umi config
      { type: 'replace', value: [/\.umirc/g, '.dumirc'] },
      // replace umi word
      { type: 'replace', value: [/('|`)umi/g, '$1dumi'] },
      // replace same page url
      {
        type: 'replace',
        value: [/https:\/\/umijs\.org\/docs\/api\/config/g, ''],
      },
      // replace @primary-color to @c-primary (dumi theme variables)
      {
        type: 'replace',
        value: [
          /(theme: { '@primary-color': '#1DA57A' })/,
          `// 修改 dumi 默认主题的主色，更多变量详见：https://github.com/umijs/dumi/blob/master/src/client/theme-default/styles/variables.less\n(theme: { '@c-primary': '#1DA57A' })`,
        ],
      },
    ],
  },
  {
    localname: 'api.md',
    path: 'docs/docs/api/api.md',
    actions: [
      ...REPLACE_MESSAGE_MDX,
      // remove head content
      { type: 'slice', value: [6] },
      { type: 'replace', value: ['{\n/*\n', ''] },
      // remove unnecessary option
      ...['dynamic'].map((option) => ({
        type: 'replace',
        value: [new RegExp(`(?:^|[\r\n])### ${option}[^]+?([\r\n]#|$)`), '$1'],
      })),
      // replace umi word
      { type: 'replace', value: [/('|")umi/g, '$1dumi'] },
      // replace jsx to jsx | pure
      { type: 'replace', value: [/\n```(jsx|tsx)\s*\n/g, '\n```$1 | pure\n'] },
      // replace umi statement
      {
        type: 'replace',
        value: [/(在|用)(\s?)umi/gi, '$1$2dumi'],
      },
    ],
  },
  {
    localname: 'plugin.md',
    path: 'docs/docs/guides/plugins.md',
    actions: [
      ...REPLACE_MESSAGE_MDX,
      // remove head content
      { type: 'slice', value: [1] },
      { type: 'replace', value: ['Umi 的核心就在于它的插件机制。', ''] },
      // remove unnecessary section
      ...['preset-umi'].map((option) => ({
        type: 'replace',
        value: [new RegExp(`(?:^|[\r\n])### ${option}[^]+?([\r\n]#|$)`), '$1'],
      })),
      // replace umi word
      { type: 'replace', value: [/('|")umi/g, '$1dumi'] },
      { type: 'replace', value: [/umi@3/g, 'dumi@1'] },
      { type: 'replace', value: [/Umi(\s|-)/gi, 'dumi$1'] },
      { type: 'replace', value: [/UMI/g, 'DUMI'] },
      // replace plugin api link
      {
        type: 'replace',
        value: [/\/api\/plugin-api/g, '/plugin/api.md'],
      },
    ],
  },
  {
    localname: 'plugin-api.md',
    path: 'docs/docs/api/plugin-api.md',
    actions: [
      // remove head content
      { type: 'slice', value: [6] },
      // remove unnecessary section
      ...['modifyViteConfig'].map((option) => ({
        type: 'replace',
        value: [new RegExp(`(?:^|[\r\n])### ${option}[^]+?([\r\n]#|$)`), '$1'],
      })),
      // replace umi word
      { type: 'replace', value: [/('|")umi/g, '$1dumi'] },
      { type: 'replace', value: [/umi@3/g, 'dumi@1'] },
      { type: 'replace', value: [/umi@4/g, 'dumi@2'] },
      { type: 'replace', value: [/Umi(\s|-|!)/gi, 'dumi$1'] },
      { type: 'replace', value: [/UMI/g, 'DUMI'] },
      // put embed flag
      { type: 'replace', value: [/(## 核心 API)/, '<!-- core api -->\n\n$1'] },
      {
        type: 'replace',
        value: [
          /(## 扩展方法)/,
          '<!-- core api end -->\n\n<!-- methods -->\n\n$1',
        ],
      },
      {
        type: 'replace',
        value: [/(## 属性)/, '<!-- methods end -->\n\n<!-- props -->\n\n$1'],
      },
      { type: 'replace', value: [/$/, '<!-- props end -->'] },
      // replace plugin api link
      // {
      //   type: 'replace',
      //   value: [/\/api\/plugin-api/g, '/plugin/api'],
      // },
    ],
  },
];

const UPSTREAM = { owner: 'umijs', repo: 'umi' };
const UMI_DOC_DIR = path.join(__dirname, '..', 'docs', '.upstream');

function getRemoteTag() {
  return octokit.request('GET /repos/{owner}/{repo}/tags', {
    owner: UPSTREAM.owner,
    repo: UPSTREAM.repo,
    per_page: 1,
    page: 1,
  });
}

function getRemoteContent(path, ref) {
  return octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: UPSTREAM.owner,
    repo: UPSTREAM.repo,
    path,
    headers: {
      accept: 'application/vnd.github.raw',
    },
    ref,
  });
}

async function main() {
  if (!fs.existsSync(UMI_DOC_DIR)) {
    fs.mkdirSync(UMI_DOC_DIR);
  }

  const { data } = await getRemoteTag();
  const ref = data[0].name;
  if (!ref) {
    throw new Error('[sync umijs docs]: no ref found');
  }

  for (const file of FILE_LIST) {
    const { data } = await getRemoteContent(file.path, ref);

    let content = data;
    (file.actions || []).forEach((action) => {
      switch (action.type) {
        case 'slice':
          content = content
            .split(/\n/g)
            .slice(action.value[0], action.value[1])
            .join('\n');
          break;
        case 'replace':
          content = content.replace(action.value[0], action.value[1]);
          break;
        default:
      }
    });

    fs.writeFileSync(path.join(UMI_DOC_DIR, file.localname), content);
    console.log('sync', file.localname, 'from upstream successfully!');
  }
}

main().catch((error) => {
  console.error('[sync umijs docs]:', error);
  process.exit(1);
});
