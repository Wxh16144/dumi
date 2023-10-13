import Tabs from 'rc-tabs';
import toArray from 'rc-util/lib/Children/toArray';
import * as React from 'react';

export interface CodeGroupProps {
  slogan?: React.ReactNode;
}

function CodeGroup(props: React.PropsWithChildren<CodeGroupProps>) {
  const { children } = props;
  const [activeKey, setActiveKey] = React.useState(0);

  const childrenArray = toArray(children);

  // TODO: Should be deleted. assign: @Wuxh<wxh1220@gmail.com>
  globalThis.console.log('%c@Wuxh(Red)', 'color:red;', {
    value: 1577361,
    props,
    childrenArray,
  });

  const C = childrenArray[activeKey];

  return (
    <>
      <Tabs
        defaultActiveKey={String(activeKey)}
        onChange={(key) => setActiveKey(Number(key))}
        items={childrenArray.map((child, i) => ({
          key: String(i),
          label: child.props.meta?.filename || i,
          // label: child.props.meta.filename,
        }))}
        //  items={files.map(([filename], i) => ({
        //    key: String(i),
        //    label: filename,
        //  }))}
      />
      {/* This is index.tsx} */}
      {C}
    </>
  );
}

export default CodeGroup;
