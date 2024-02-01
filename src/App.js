import './App.css';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';

// Import Quill modules
import 'quill-emoji/dist/quill-emoji.css';
// import 'quill-find-replace/dist/quill.findreplace.css';
import 'quill-better-table/dist/quill-better-table.css';

// Import Quill modules as needed
import QuillEmoji from 'quill-emoji';
// import QuillFindReplace from 'quill-find-replace';
import QuillCursors from 'quill-cursors';
import QuillBetterTable from 'quill-better-table';

// Register Quill modules
Quill.register('modules/emoji', QuillEmoji);
// Quill.register('modules/find-replace', QuillFindReplace);
Quill.register('modules/cursors', QuillCursors);
Quill.register('modules/better-table', QuillBetterTable);

// Quill Toolbar options
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  // [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['link', 'image', 'video', 'emoji'],
  ['clean'],
  ['better-table'],
  ['find-replace'],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
];

const QuillEditor = () => {
  const [editorHtml, setEditorHtml] = useState('');

  let editor = null;

  const handleChange = (e) => {
    setEditorHtml(e);
  };

  const addTable = (e) => {
    e.preventDefault();
    // Quill.getModule("better-table").insertTable(3,3);
    this.quillRef.getEditor().getModule('better-table');

}


  return (
    <div style={{height:"500px",width:"800px",margin:"0px auto",}}>
      <h1 style={{textAlign:"center"}}>React Quill Text Editor</h1>
      <button onClick={(event) =>addTable(event)}>Add Table</button>
      <ReactQuill
        theme="snow"
        ref={(el) =>{editor = el}}
        placeholder='Write something here...'
        modules={{
          toolbar: toolbarOptions,
          'emoji-toolbar': true,
          // 'find-replace': true,
          // 'better-table': true,
          table:false,
          // 'better-table': {
          //   operationMenu:{
          //     items:{
          //       unmergeCells:{ text:"Another unmerge Cells name"}
          //     }
          //   }
          // },
          keyboard:{
            bindings:QuillBetterTable.keyboardBindings
          },
          cursors: true,
          clipboard: {
            matchVisual: false,
            allowed: {
              tags: ['a', 'b', 'strong', 'u', 's', 'i', 'p', 'br', 'ul', 'ol', 'li', 'span'],
              attributes: ['href', 'rel', 'target', 'class']
          },
          },
        }}
        formats={[
          'header',
          'font',
          'size',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'indent',
          'script',
          'link',
          'image',
          'video',
          'emoji',
          'color',
          'background',
          'align',
        ]}
        value={editorHtml}
        onChange={handleChange}
      />
      <div dangerouslySetInnerHTML={{__html: editorHtml}}>
      </div>
      <div>
        {editorHtml}
      </div>
    </div>
  );
};

export default QuillEditor;
