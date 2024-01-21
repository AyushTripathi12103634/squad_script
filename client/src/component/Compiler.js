import { React, useState, useRef } from 'react';
import axios from "axios";
import Editor from '@monaco-editor/react';
import './Compiler.css'

function Compiler() {

  const files = {
    'C# (Mono 6.6.0.161)': {
      name: 'script.cs',
      language: 'C# (Mono 6.6.0.161)',
      value: 'using System;\nclass HelloWorld\n{\nstatic void Main()\n{\nConsole.WriteLine("Hello World");\n}\n}',
      id: 51,
      is_archived: false,
      editor_name: 'csharp'
    },
    'C# (mono 5.4.0.167)': {
      name: 'script.cs',
      language: 'C# (mono 5.4.0.167)',
      value: 'using System;\nclass HelloWorld\n{\nstatic void Main()\n{\nConsole.WriteLine("Hello World");\n}\n}',
      id: 16,
      is_archived: true,
      editor_name: 'csharp'
    },
    'C# (mono 5.2.0.224)': {
      name: 'script.cs',
      language: 'C# (mono 5.2.0.224)',
      value: 'using System;\nclass HelloWorld\n{\nstatic void Main()\n{\nConsole.WriteLine("Hello World");\n}\n}',
      id: 17,
      is_archived: true,
      editor_name: 'csharp'
    },
    'C++ (GCC 9.2.0)': {
      name: 'script.cpp',
      language: 'C++ (GCC 9.2.0)',
      value: '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\ncout<<"Hello World";\n\nreturn 0;\n}',
      id: 54,
      is_archived: false,
      editor_name: 'cpp'
    },
    'C++ (GCC 8.3.0)': {
      name: 'script.cpp',
      language: 'C++ (GCC 8.3.0)',
      value: '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\ncout<<"Hello World";\n\nreturn 0;\n}',
      id: 53,
      is_archived: false,
      editor_name: 'cpp'
    },
    'C++ (GCC 7.4.0)': {
      name: 'script.cpp',
      language: 'C++ (GCC 7.4.0)',
      value: '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\ncout<<"Hello World";\n\nreturn 0;\n}',
      id: 52,
      is_archived: false,
      editor_name: 'cpp'
    },
    'C++ (g++ 7.2.0)': {
      name: 'script.cpp',
      language: 'C++ (g++ 7.2.0)',
      value: '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\ncout<<"Hello World";\n\nreturn 0;\n}',
      id: 10,
      is_archived: true,
      editor_name: 'cpp'
    },
    'C++ (g++ 6.4.0)': {
      name: 'script.cpp',
      language: 'C++ (g++ 6.4.0)',
      value: '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\ncout<<"Hello World";\n\nreturn 0;\n}',
      id: 11,
      is_archived: true,
      editor_name: 'cpp'
    },
    'C++ (g++ 6.3.0)': {
      name: 'script.cpp',
      language: 'C++ (g++ 6.3.0)',
      value: '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\ncout<<"Hello World";\n\nreturn 0;\n}',
      id: 12,
      is_archived: true,
      editor_name: 'cpp'
    },
    'C++ (g++ 5.4.0)': {
      name: 'script.cpp',
      language: 'C++ (g++ 5.4.0)',
      value: '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\ncout<<"Hello World";\n\nreturn 0;\n}',
      id: 13,
      is_archived: true,
      editor_name: 'cpp'
    },
    'C++ (g++ 4.9.4)': {
      name: 'script.cpp',
      language: 'C++ (g++ 4.9.4)',
      value: '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\ncout<<"Hello World";\n\nreturn 0;\n}',
      id: 14,
      is_archived: true,
      editor_name: 'cpp'
    },
    'C++ (g++ 4.8.5)': {
      name: 'script.cpp',
      language: 'C++ (g++ 4.8.5)',
      value: '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\ncout<<"Hello World";\n\nreturn 0;\n}',
      id: 15,
      is_archived: true,
      editor_name: 'cpp'
    },
    'Java (OpenJDK 13.0.1)': {
      name: 'script.java',
      language: 'Java (OpenJDK 13.0.1)',
      value: 'ls',
      id: 62,
      is_archived: false,
      editor_name: 'java'
    },
    'Java (OpenJDK 9 with Eclipse OpenJ9)': {
      name: 'script.java',
      language: 'Java (OpenJDK 9 with Eclipse OpenJ9)',
      value: 'public class Main\n{\npublic static void main(String[] args) {\nSystem.out.println("Hello World");\n}\n}',
      id: 26,
      is_archived: true,
      editor_name: 'java'
    },
    'Java (OpenJDK 8)': {
      name: 'script.java',
      language: 'Java (OpenJDK 8)',
      value: 'public class Main\n{\npublic static void main(String[] args) {\nSystem.out.println("Hello World");\n}\n}',
      id: 27,
      is_archived: true,
      editor_name: 'java'
    },
    'Java (OpenJDK 7)': {
      name: 'script.java',
      language: 'Java (OpenJDK 7)',
      value: 'public class Main\n{\npublic static void main(String[] args) {\nSystem.out.println("Hello World");\n}\n}',
      id: 28,
      is_archived: true,
      editor_name: 'java'
    },
    'JavaScript (Node.js 12.14.0)': {
      name: 'script.js',
      language: 'JavaScript (Node.js 12.14.0)',
      value: 'console.log("Hello World");',
      id: 63,
      is_archived: false,
      editor_name: 'javascript'
    },
    'JavaScript (nodejs 8.5.0)': {
      name: 'script.js',
      language: 'JavaScript (nodejs 8.5.0)',
      value: 'console.log("Hello World");',
      id: 29,
      is_archived: true,
      editor_name: 'javascript'
    },
    'JavaScript (nodejs 7.10.1)': {
      name: 'script.js',
      language: 'JavaScript (nodejs 7.10.1)',
      value: 'console.log("Hello World");',
      id: 30,
      is_archived: true,
      editor_name: 'javascript'
    },
    'Lua (5.3.5)': {
      name: 'script.lua',
      language: 'Lua (5.3.5)',
      value: 'print("Hello World")',
      id: 64,
      is_archived: false,
      editor_name: 'lua'
    },
    'PHP (7.4.1)': {
      name: 'script.php',
      language: 'PHP (7.4.1)',
      value: '<?php\necho "Hello World";',
      id: 68,
      is_archived: false,
      editor_name: 'php'
    },
    'Python (3.8.1)': {
      name: 'script.py',
      language: 'Python (3.8.1)',
      value: 'print("Hello World")',
      id: 71,
      is_archived: false,
      editor_name: 'python'
    },
    'Python (3.6.0)': {
      name: 'script.py',
      language: 'Python (3.6.0)',
      value: 'print("Hello World")',
      id: 34,
      is_archived: true,
      editor_name: 'python'
    },
    'Python (2.7.17)': {
      name: 'script.py',
      language: 'Python (2.7.17)',
      value: 'print("Hello World")',
      id: 70,
      is_archived: false,
      editor_name: 'python'
    },
    'Python (2.7.9)': {
      name: 'script.py',
      language: 'Python (2.7.9)',
      value: 'print("Hello World")',
      id: 36,
      is_archived: true,
      editor_name: 'python'
    },
    'Python (2.6.9)': {
      name: 'script.py',
      language: 'Python (2.6.9)',
      value: 'print("Hello World")',
      id: 37,
      is_archived: true,
      editor_name: 'python'
    },
    'Python (3.5.3)': {
      name: 'script.py',
      language: 'Python (3.5.3)',
      value: 'print("Hello World")',
      id: 35,
      is_archived: true,
      editor_name: 'python'
    },
    'TypeScript (3.7.4)': {
      name: 'script.ts',
      language: 'TypeScript (3.7.4)',
      value: 'let message: string = "Hello, World!";\nconsole.log(message);',
      id: 74,
      is_archived: false,
      editor_name: 'typescript'
    }
  }

  // {"stdout":"Hello World","time":"0.001","memory":784,"stderr":null,"token":"e3e8b7a3-1d1b-4dd4-b2c5-3d3d711cd612","compile_output":null,"message":null,"status":{"id":3,"description":"Accepted"}}

  const [fileName, setFileName] = useState('C# (Mono 6.6.0.161)');
  const [fileContent, setFileContent] = useState(files[fileName].value);
  const [output, setoutput] = useState("");
  const [executiontime, setexecutiontime] = useState("");
  const [executionspace, setexecutionspace] = useState("");
  const [executionerror, setexecutionerror] = useState("");
  const [editortheme, seteditortheme] = useState("vs-dark");
  const [stdin, setstdin] = useState("");
  const editorRef = useRef(null);
  const file = files[fileName];

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const handleLanguageChange = (e) => {
    const selectedFileName = e.target.value;
    if (files.hasOwnProperty(selectedFileName)) {
      setFileName(selectedFileName);
      setFileContent(files[selectedFileName].value);
    }
  };

  const handleinputchange = (e) => {
    setstdin(e.target.value);
  }

  const handlethemechange = (e) => {
    seteditortheme(e.target.value);
  }

  const submitcode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/rapidapi/judge`, {
        "language_id": file.id,
        "source_code": fileContent,
        "stdin": stdin ? stdin : "",
      });

      const { token } = response.data;
      const result = await axios.get(`http://localhost:5000/api/v1/rapidapi/judge/${token}`);
      const { stdout, time, memory, stderr } = result.data;
      setoutput(stdout);
      setexecutiontime(time);
      setexecutionspace(memory);
      setexecutionerror(stderr);
      console.log(stdout, time, memory, stderr);
    }
    catch (e) {
      console.log(e);
    }
  }


  return (
    <>

      <div className='d-flex justify-content-evenly'>
        <div className='language'>
          <form className='d-flex justify-content-evenly'>
            <select className='form-select' id="languages" onChange={handleLanguageChange} value={fileName}>
              {Object.keys(files).map((key) => (
                <option key={key} value={key}>
                  {files[key].language}
                </option>
              ))}
            </select>
            <select className='form-select' onChange={handlethemechange}>
                <option value="vs-dark">VS-Dark Theme</option>
                <option value="vs-light">VS-Light Theme</option>
            </select>
          </form>
          <Editor
            height="50vh"
            theme={editortheme}
            width="100%"
            path={file.name}
            language={file.editor_name}
            value={fileContent}
            onMount={handleEditorDidMount}
            onChange={(value, event) => setFileContent(value)}
            options={{
              "acceptSuggestionOnCommitCharacter": true,
              "acceptSuggestionOnEnter": "on",
              "accessibilitySupport": "auto",
              "autoIndent": true,
              "automaticLayout": true,
              "codeLens": true,
              "colorDecorators": true,
              "contextmenu": true,
              "cursorBlinking": "blink",
              "cursorSmoothCaretAnimation": true,
              "cursorStyle": "line",
              "disableLayerHinting": true,
              "disableMonospaceOptimizations": true,
              "dragAndDrop": true,
              "fixedOverflowWidgets": true,
              "folding": true,
              "foldingStrategy": "auto",
              "fontLigatures": true,
              "formatOnPaste": true,
              "formatOnType": true,
              "hideCursorInOverviewRuler": true,
              "highlightActiveIndentGuide": true,
              "links": true,
              "mouseWheelZoom": true,
              "multiCursorMergeOverlapping": true,
              "multiCursorModifier": "alt",
              "overviewRulerBorder": true,
              "overviewRulerLanes": 2,
              "quickSuggestions": true,
              "quickSuggestionsDelay": 10,
              "readOnly": false,
              "renderControlCharacters": true,
              "renderFinalNewline": true,
              "renderIndentGuides": true,
              "renderLineHighlight": "all",
              "renderWhitespace": "none",
              "revealHorizontalRightPadding": 30,
              "roundedSelection": true,
              "rulers": [],
              "scrollBeyondLastColumn": 5,
              "scrollBeyondLastLine": true,
              "selectOnLineNumbers": true,
              "selectionClipboard": true,
              "selectionHighlight": true,
              "showFoldingControls": "mouseover",
              "smoothScrolling": true,
              "suggestOnTriggerCharacters": true,
              "wordBasedSuggestions": true,
              "wordSeparators": "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
              "wordWrap": "off",
              "wordWrapBreakAfterCharacters": "\t})]?|&,;",
              "wordWrapBreakBeforeCharacters": "{([+",
              "wordWrapBreakObtrusiveCharacters": ".",
              "wordWrapColumn": 80,
              "wordWrapMinified": true,
              "wrappingIndent": "none"
            }}
          />
          <button className='btn btn-success' onClick={submitcode}>Submit</button>

        </div>
        <div className='output me-5'>
          <textarea id="inputhandler" className='form-control' onChange={handleinputchange}></textarea>
          {!executionerror ? (
            <textarea className='form-control' readOnly>
              {`Output: ${output}\nTime Taken: ${executiontime}\nSpace Taken: ${executionspace}`}
            </textarea>
          ) : (
            <textarea className='form-control' readOnly>{`Error: ${executionerror}`}</textarea>
          )}
        </div>

      </div>
    </>
  );
}

export default Compiler;