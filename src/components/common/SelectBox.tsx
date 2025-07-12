'use client';
import { useEffect, useRef, useState } from 'react';
import Select, { components } from 'react-select';
import { twMerge } from 'tailwind-merge';
import Icon from './Icon';

/*
    options : 셀렉트 옵션 배열
    width: width 속성값
    placeholder: 플레이스 홀더
    defaultValueIndex : 디폴트 옵션
    footstep: 발자국 아이콘 유무
    isCenter: 중앙 정렬
    hasBorder: 보더 유무
*/
export default function SelectBox({
  options,
  width,
  placeholder,
  defaultValueIndex = 0,
  footstep = false,
  isCenter = false,
  hasBorder = false,
  thinBorder = false,
  borderColor = 'var(--color-primary-200)',
}: {
  options: { value: string; label: string }[];
  width: string;
  placeholder?: string;
  defaultValueIndex?: number;
  footstep?: boolean;
  isCenter?: boolean;
  hasBorder?: boolean;
  thinBorder?: boolean;
  borderColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fontSize, setFontSize] = useState('16px');
  useEffect(() => {
    if (!containerRef.current) return;
    const style = window.getComputedStyle(containerRef.current);
    setFontSize(style.fontSize);
  }, [setFontSize]);
  console.log(borderColor);
  return (
    <div ref={containerRef}>
      <Select
        isSearchable={false}
        options={options}
        placeholder={placeholder}
        defaultValue={placeholder ? 'none' : options[defaultValueIndex]}
        components={{
          Option: ({ children, ...rest }) => (
            <components.Option {...rest}>
              <div
                className={twMerge(
                  'flex items-center gap-2',
                  isCenter && 'justify-center',
                )}
              >
                {footstep && (
                  <Icon width="16px" height="14px" left="-26px" top="-79px" />
                )}
                {children}
              </div>
            </components.Option>
          ),
          DropdownIndicator: (props) => (
            <components.DropdownIndicator {...props}>
              <Icon
                className={twMerge(
                  'scale-2em absolute top-1/2 right-[18px] -translate-y-1/2',
                  fontSize === '18px' || fontSize === '20px'
                    ? 'scale-120'
                    : fontSize === '14px'
                      ? 'scale-80'
                      : fontSize === '12px'
                        ? 'scale-70'
                        : 'scale-100',
                )}
                width="12px"
                height="7px"
                left="-266px"
                top="-209px"
              />
            </components.DropdownIndicator>
          ),
        }}
        styles={{
          control: (base) => ({
            ...base,
            border: hasBorder
              ? thinBorder
                ? '1px solid rgba(43, 41, 38, 0.5)'
                : `1px solid ${borderColor}`
              : 'none',
            width,
            borderRadius: hasBorder ? '12px' : '',
            boxShadow: 'none',
            fontWeight: '500',
            cursor: 'pointer',
            background: 'none',
            minHeight: fontSize === '14px' ? '20px' : '0',
            paddingBlock: hasBorder ? '8px' : '',
            paddingInline: hasBorder ? '1em' : '',
            '&:hover': {
              border: hasBorder
                ? thinBorder
                  ? '1px solid rgba(43, 41, 38, 0.5)'
                  : `1px solid ${borderColor}`
                : 'none',
            },
          }),
          singleValue: (base) => ({
            ...base,
            margin: 0,
          }),
          valueContainer: (base) => ({
            ...base,
            padding: 0,
          }),
          menu: (base) => ({
            ...base,
            borderRadius: '20px',
            width:
              footstep && !hasBorder
                ? `${Number(width.replace('px', '')) + 20}px`
                : width,
            position: 'absolute',
            background: 'var(--color-background)',
            right: 0,
            padding: fontSize === '12px' ? 0 : '0.6em',
          }),
          menuList: (base) => ({
            ...base,
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }),
          option: (base, state) => ({
            ...base,
            cursor: 'pointer',
            fontSize: '0.9em',
            color: 'var(--color-black)',
            backgroundColor: state.isSelected ? 'none' : '',
            '&:hover': {
              backgroundColor: 'var(--color-primary-200)',
            },
          }),
          placeholder: (base) => ({
            ...base,
            color: 'var(--color-grey)',
          }),
        }}
        classNames={{
          indicatorSeparator: () => 'hidden',
          menu: () =>
            thinBorder
              ? 'border border-[rgba(43,41,38,0.5)]'
              : `border border-[${borderColor}] w-full`,
          option: () => 'rounded-[8px] font-medium',
        }}
      />
    </div>
  );
}
