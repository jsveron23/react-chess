import { forwardRef } from 'react';

// HTML 속성들 (style로 전달하지 않을 것들)
const HTML_ATTRS = new Set([
  'children',
  'className',
  'style',
  'id',
  'name',
  'type',
  'disabled',
  'value',
  'defaultValue',
  'placeholder',
  'href',
  'src',
  'alt',
  'target',
  'rel',
  'htmlFor',
  'role',
  'tabIndex',
  'checked',
  'readOnly',
  'autoFocus',
  'autoComplete',
  'multiple',
  'rows',
  'cols',
  'min',
  'max',
  'step',
]);

// props를 HTML 속성과 CSS style로 분리
function splitProps(props) {
  const htmlProps = {};
  const styleProps = {};

  for (const [key, value] of Object.entries(props)) {
    if (
      HTML_ATTRS.has(key) ||
      key.startsWith('on') ||
      key.startsWith('data-') ||
      key.startsWith('aria-')
    ) {
      htmlProps[key] = value;
    } else {
      styleProps[key] = value;
    }
  }

  return { htmlProps, styleProps };
}

// ui-box의 Box 컴포넌트를 대체
// - `is` prop으로 렌더링할 HTML 태그 또는 컴포넌트 지정
// - 나머지 props는 CSS style로 자동 변환
const Box = forwardRef(function Box(
  { is: Tag = 'div', children, style: styleProp, ...rest },
  ref
) {
  // Tag가 string (HTML 태그)이면 props를 style로 분리
  // Tag가 컴포넌트이면 props를 그대로 전달 (컴포넌트가 처리)
  if (typeof Tag === 'string') {
    const { htmlProps, styleProps } = splitProps(rest);
    return (
      <Tag ref={ref} style={{ ...styleProps, ...styleProp }} {...htmlProps}>
        {children}
      </Tag>
    );
  }

  // Tag가 React 컴포넌트인 경우 props를 그대로 전달
  return (
    <Tag ref={ref} style={styleProp} {...rest}>
      {children}
    </Tag>
  );
});

export default Box;
