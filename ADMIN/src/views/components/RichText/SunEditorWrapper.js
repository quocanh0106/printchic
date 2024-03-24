// components/SunEditorWrapper.js
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css'; // Đảm bảo bạn đã import CSS
import React from 'react';

const SunEditor = dynamic(() => import('suneditor-react').then(mod => mod.default), {
  ssr: false,
});

const SunEditorWrapper = ({ content, setContent }) => {
  const editorOptions = {
    buttonList: [
      ['undo', 'redo'],
      ['font', 'fontSize', 'formatBlock'],
      ['paragraphStyle', 'blockquote'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['fontColor', 'hiliteColor', 'textStyle'],
      ['removeFormat'],
      ['outdent', 'indent'],
      ['align', 'horizontalRule', 'list', 'lineHeight'],
      ['table', 'link', 'image', 'video', 'audio'], // 'image' button in the toolbar
      ['fullScreen', 'showBlocks', 'codeView'],
      ['preview', 'print'],
      ['save', 'template'],
    ],
    "attributesWhitelist": {
      "all": "style",
      "input": "checked"
    },
    
    // Các tùy chọn khác cho SunEditor
  };

  return (
    <SunEditor
      lang="en"
      setOptions={editorOptions}
      height="100%"
      setContents={content}
      onChange={setContent}
    />
  );
};

export default SunEditorWrapper;
