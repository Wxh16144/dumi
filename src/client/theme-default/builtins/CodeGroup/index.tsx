import { SourceCodeProps } from 'dumi/theme/builtins/SourceCode';
import Tabs, { TabsProps } from 'rc-tabs';
import toArray from 'rc-util/lib/Children/toArray';
import React from 'react';

// todo: 添加样式
import 'rc-tabs/assets/index.css';

type Unpacked<T> = T extends (infer U)[] ? U : T;
type Item = Unpacked<Required<TabsProps>['items']>;

function CodeGroup(props: React.PropsWithChildren) {
  const { children } = props;

  const usefulChildren = toArray(children).filter((child) =>
    [
      typeof child === 'object',
      typeof child?.type === 'function',
      // child?.type.displayName === 'SourceCode',
      // child?.type.name === 'SourceCode',
      child?.key,
    ].every(Boolean),
  ) as React.ReactElement<SourceCodeProps>[];

  const items = usefulChildren.map<Item>((child) => {
    const { lang, title } = child.props ?? {};

    return {
      key: child.key as string,
      label: [title, lang, 'txt'].find(Boolean),
      children: child,
    };
  });

  return <Tabs items={items} />;
}

export default CodeGroup;
