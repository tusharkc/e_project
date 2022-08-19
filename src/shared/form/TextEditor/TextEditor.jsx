import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import '@doct-react/core/build/textEditor.scss';
import './TextEditor.scss';

const TEXT_EDITOR_PROPS = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  },
  formats: ['bold', 'italic', 'underline', 'link', 'list'],
};

export default function TextEditor({ placeholder = 'Type here...', control, name = 'textEditor' }) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const props = {
    className: isFocused ? 'doct-text-editor quill-focused' : 'doct-text-editor',
    value,
    onChange: setValue,
    placeholder,
    theme: 'snow',
    modules: TEXT_EDITOR_PROPS.modules,
    formats: TEXT_EDITOR_PROPS.formats,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    name,
  };

  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return <ReactQuill {...props} onChange={onChange} value={value || ''} />;
        }}
      />
    );
  }

  return <ReactQuill {...props} />;
}
