import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.css';
// import 'quill-find-replace/dist/quill.findreplace.css'; //this module is not found in npm
import 'quill-better-table/dist/quill-better-table.css';

// Import Quill modules as needed
import QuillEmoji from 'quill-emoji';
// import QuillFindReplace from 'quill-find-replace'; //this module is not found in npm
import QuillCursors from 'quill-cursors';
import QuillBetterTable from 'quill-better-table';
import htmlEditButton from "quill-html-edit-button";
import Focus from 'quill-focus';


Quill.register('modules/emoji', QuillEmoji);
// Quill.register('modules/find-replace', QuillFindReplace); //this module is not found in npm 
Quill.register('modules/cursors', QuillCursors);
Quill.register('modules/better-table', QuillBetterTable);
Quill.register('modules/htmlEditButton', htmlEditButton)
Quill.register('modules/focus', Focus)

// Quill Toolbar options
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['link', 'image', 'video', 'emoji'],
  ['clean'],
  ['better-table'],
  ['find-replace'],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['table'],
  
];

const QuillEditor = () => {
  const [editorHtml, setEditorHtml] = useState('');
  const [editorHtmlValue,setEditorHtmlValue] = useState('')

  const handleChange = (e) => {
    setEditorHtml(e);
  };

const reactQuillRef =useRef(null);

const insertTable = () => {
  const editor = reactQuillRef.current.getEditor();
  const tableModule = editor.getModule("better-table");
  tableModule.insertTable(3, 3);
};

 useEffect(() => {
  const editor = reactQuillRef.current.getEditor();
  const toolbar = editor.getModule("toolbar");
  console.log(toolbar)
  toolbar.addHandler("table", () => {
    insertTable();
  });
}, [])


  return (
    <div style={{height:"500px",width:"800px",margin:"0px auto",}}>
      <h1 style={{textAlign:"center"}}>React Quill Text Editor</h1>
      <ReactQuill
        theme="snow"
        ref={reactQuillRef}
        placeholder='Write something here...'
        modules={{
          toolbar: toolbarOptions,
          'emoji-toolbar': true,
          // 'better-table': true,
          // table:false,
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
          htmlEditButton: {},
          clipboard: {
            matchVisual: false,
            allowed: {
              tags: ['a', 'b', 'strong', 'u', 's', 'i', 'p', 'br', 'ul', 'ol', 'li', 'span'],
              attributes: ['href', 'rel', 'target', 'class']
          },
          },
          focus: {
            focusClass: 'focused-blot',
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
          'table',
        ]}
        value={editorHtml}
        onChange={handleChange}
      />
      <button 
      onClick={()=>{setEditorHtmlValue(editorHtml)}}
      style={{color:'black',backgroundColor:"aqua",height:'30px',borderRadius:"4px",margin:"5px 0"}} >Submit Content</button>
      <h2>Display Typing Content here below:  </h2>
      <div dangerouslySetInnerHTML={{__html: editorHtmlValue}}>
      </div>
      <h2>Display Content to HTML here below:</h2>
      <div>
        {editorHtmlValue}
      </div>
    </div>
  );
};

export default QuillEditor;
