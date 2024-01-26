'use client'
import { useState } from "react";

import MonacoEditor from "@monaco-editor/react";
import { languageOptions } from "../Constants/languageOptions";
import LanguagesDropdown from "./LanguageDropdown";

const CodeEditor = ({setCode}) => {
  const [value, setValue] = useState("");

  const handleEditorChange = (value) => {
    setValue(value);

  };
  const [language, setLanguage] = useState(languageOptions[0].value);
  
  const onSelectChange = (sl) => {
    console.log("selected Option...", sl.value);
    setValue("");
    setLanguage(sl);
  }; 


  return (
    
      
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <LanguagesDropdown onSelectChange={onSelectChange} />
      <MonacoEditor
        height="70vh"
        width={`180vh`}
        language={language.value || "javascript"}
        value={value}
        theme="vs-dark"
        defaultValue="// some comment"
        onChange={(e)=>setCode(e)}
      />
    </div>
  );
};
export default CodeEditor;