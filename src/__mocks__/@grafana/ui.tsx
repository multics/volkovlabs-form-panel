import React, { useState } from 'react';
import { dateTime } from '@grafana/data';

const actual = jest.requireActual('@grafana/ui');

/**
 * Mock Code Editor
 */
const CodeEditor = jest.fn(({ onBlur, ...restProps }) => {
  return (
    <input
      aria-label={restProps['aria-label']}
      value={restProps.value}
      onChange={(event) => {
        if (onBlur) {
          onBlur(event.target.value);
        }
      }}
      onBlur={(event) => {
        if (onBlur) {
          onBlur(event.target.value);
        }
      }}
    />
  );
});

/**
 * Mock DatetimePicker component
 */
const DateTimePicker = jest.fn(({ onChange, ...restProps }) => {
  return (
    <input
      data-testid={restProps['data-testid']}
      value={restProps.value}
      onChange={(event) => {
        if (onChange) {
          onChange(dateTime(event.target.value));
        }
      }}
    />
  );
});

/**
 * Mock Select component
 */
const Select = jest.fn(({ options, onChange, value, isMulti, isClearable, ...restProps }) => (
  <select
    onChange={(event: any) => {
      if (onChange) {
        if (isMulti) {
          onChange(options.filter((option: any) => event.target.values.includes(option.value)));
        } else {
          onChange(options.find((option: any) => option.value === event.target.value));
        }
      }
    }}
    /**
     * Fix jest warnings because null value.
     * For Select component in @grafana/ui should be used null to reset value.
     */
    value={value === null ? '' : value?.value || value}
    multiple={isMulti}
    {...restProps}
  >
    {isClearable && (
      <option key="clear" value="">
        Clear
      </option>
    )}
    {options.map(({ label, value }: any) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
));

/**
 * Mock FileDropzone
 */
const FileDropzone = jest.fn(({ onChange, options, onFileRemove, ...props }) => {
  const { onDrop } = options;
  const [files, setFiles] = useState<File[]>([]);

  return (
    <>
      <input
        type="file"
        onChange={(event) => {
          if (onDrop) {
            onDrop(event.target.files);
            setFiles(event.target.files as any);
          }
        }}
        data-testid={props['data-testid']}
      />
      {files.map((file) => (
        <button
          key={file.name}
          aria-label="Remove File"
          onClick={() => {
            setFiles((files) => files.filter((item) => item.name !== file.name));
            onFileRemove({ file });
          }}
        />
      ))}
    </>
  );
});

module.exports = {
  ...actual,
  CodeEditor,
  DateTimePicker,
  Select,
  FileDropzone,
};
