'use client'
import { useState } from "react";

import { Editor } from "@monaco-editor/react";
import { languageOptions } from "../Constants/languageOptions";
import LanguagesDropdown from "./LanguageDropdown";
const CodeEditor = ({setCode ,setLanguageapi ,setId}) => {
  const [value, setValue] = useState("");

  const handleEditorChange = (value) => {
    setValue(value);

  };
  const [language, setLanguage] = useState(languageOptions[0].value);
  
  const onSelectChange = (sl) => {
 
    setValue("");
    console.log(sl.name);
    setLanguageapi(sl.name);
    setLanguage(sl);
    setId(sl.id);
  }; 


  return (
    
      
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <LanguagesDropdown onSelectChange={onSelectChange} />
      <Editor
        height="70vh"
        width={`180vh`}
        language={language}
        value={value}
        theme="vs-dark"
        defaultValue="// some comment"
        onChange={(e)=>setCode(e)}
      />
    </div>
  );
};
export default CodeEditor;