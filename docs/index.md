---
title: dumi - 为组件研发而生的静态站点框架
hero:
  title: dumi
  description: 为组件研发而生的静态站点框架
  actions:
    - text: 立即上手
      link: /guide
    - text: GitHub
      link: https://github.com/umijs/dumi
mobile: false
---

## 谁在使用

```tsx
import React from 'react';

export default () => <div>hello world</div>;
```

## CodeGroup <Badge>2.2.2+</Badge>

需要将多代码块合并成一个分组进行展示时，可以使用 CodeGroup 语法，例如：

````jsx
/**
 * inline: true
 */
import SourceCode from 'dumi/theme/builtins/SourceCode';
const content =
  ':::code-group \n\n' +
  '```bash npm\n' +
  '$ npm install -D dumi\n' +
  '```\n\n' +
  '```bash yarn\n' +
  '$ yarn install -D dumi\n' +
  '```\n\n' +
  '```bash pnpm\n' +
  '$ pnpm install -D dumi\n' +
  '```\n\n' +
  ':::';
export default () => <SourceCode lang="md">{content}</SourceCode>;
````

将会被渲染为：

:::code-group

```bash npm
$ npm install -D dumi
```

```bash yarn
$ yarn install -D dumi
```

```bash pnpm
$ pnpm install -D dumi
```

:::

或者直接使用内置 `<code-group>` 标签

````jsx
/**
 * inline: true
 */
import SourceCode from 'dumi/theme/builtins/SourceCode';
const content =
  '<code-group>\n' +
  '\n' +
  '```js JavaScript\n' +
  "const dumi = 'dumi';\n" +
  '```\n\n' +
  '```ts TypeScript\n' +
  "const dumi: string = 'dumi';\n" +
  '```\n\n' +
  '```md MarkDown\n' +
  'Welcome to Dumi! 😄\n' +
  '```\n' +
  '\n' +
  '</code-group>\n';
export default () => <SourceCode lang="md">{content}</SourceCode>;
````

<code-group >

```js JavaScript
const dumi = 'dumi';
```

```ts TypeScript
const dumi: string = 'dumi';
```

```md MarkDown
Welcome to Dumi! 😄
```

</code-group>
