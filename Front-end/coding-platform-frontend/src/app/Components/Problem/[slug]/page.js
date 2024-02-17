'use client'
import { TestCases } from '@/app/Constants/TestCases';
import axios from 'axios';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { useEffect, useState } from "react";
import CodeEditor from "../../CodeEditor";
import OutputComponent from '../../OutputComponent';
import SubmitComponent from '../../SubmitComponent';


export default function ProblemsSets  ({params})  {
  let[problemdata, setproblemdata] = useState([]);
   let[loading, setLoading]= useState(false);
  let[code, setCode] = useState("");
  let[token, setToken] = useState(null);
  let[languageapi, setLanguageapi]= useState("");
  let[id, setId] = useState(null);
  let[res, setres] = useState("");
  let[status, setStatus] = useState(null);
  let[languages, setLanguages] = useState([]);
   const[testCase , setTestCase] = useState(null);
   const[output , setOutput] = useState(null);
   
  useEffect(()=>{
        setLoading(true);
        fetch("http://localhost:5000/api/problems")
        .then(response => response.json())
        .then((data)=>{
            setLoading(false);
            setproblemdata(data)
        })
       
     
    },[])

   async function handleClick(){
  
      setLoading(true);
      TestCases.forEach((el)=>{
        
        if(el.title ===  params.slug){
          
          
          setTestCase(el.testcase + " " + el.inputs);
          console.log(testCase)
          setOutput(el.outputs)
          
        }
      })
      
 
    // //get all languages
    // const langoptions = {
    //   method: 'GET',
    //   url: `https://judge0-ce.p.rapidapi.com/languages/`,
    //   headers: {
    //     'X-RapidAPI-Key': 'c57044529amsh40f0210b6269090p1e8d62jsn94da47e1fa32',
    //     'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    //   }
    // };
    // try {
    //   if(languages.length == 0){
    //   const response = await axios.request(langoptions);
    //   setLanguages(response.data);
    // }
    //   languages.forEach(element => {
       
    //     if(element.name === languageapi){
          
    //       setId(element.id);
          
    //     }
    //   });
    // } catch (error) {
    //   console.error(error);
    // }


      // post request for the submission of code
      if(id != null){
        
        const options = {
          method: 'POST',
          url: 'https://judge0-ce.p.rapidapi.com/submissions',
          params: {
            base64_encoded: 'true',
            fields: '*'
          },
          headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'b1b8f27546msh78da1074077ff82p119b5ajsnbff0dcb6a47f',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          },
        data: {
          language_id: `${id}`,
          source_code: base64_encode(code),
          stdin:base64_encode(testCase),
          expected_output: {output}
        }
      };

      //post req of the code into the judge0api and storing the token into state
      try {
        const response = await axios.request(options);
        setToken(response.data);
        
        setLoading(false);
        if(token)
        getResult(token);
        setTimeout(10);
        
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    }

    
    //get the output of the code using token from the post request
   async function getResult({token}){
    const geturl = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;
          const getoptions = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'b1b8f27546msh78da1074077ff82p119b5ajsnbff0dcb6a47f',
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
          };

          try {
            const response = await fetch(geturl, getoptions);
            const result = await response.text();
            if(JSON.parse(result).stdout != null){
            
            setres(JSON.parse(result).stdout);
            setStatus(JSON.parse(result).status.description);

          }
          else{
            setres(JSON.parse(result).stderr);
          }
            
          } catch (error) {
            console.error(error);
          }
        }
  return(
    <div className=" flex justify-center items-center ">
        
        <div className="bg-white shadow-lg  mt-2 w-[60.4em] h-[80em] rounded-lg ">
        {
          problemdata.map((problem,index)=>{
            if(params.slug == problem.title){
              return(
              <div>
                <p className="text-center   text-xl mt-4" key={index}>{problem.title}</p>
                <br></br>
                
                <p className="ml-3">Problem Description:</p>
                <br></br>
                <p className="w-94 ml-4">{problem.description}</p>
                <p className="mt-9 ml-8">Test Case 0:</p>
                <p className="ml-12 mt-6">{problem.examples.substring(0,35)}</p>
                <p className="ml-12 mt-6">{problem.examples.substring(35)}</p>
              </div>
                )
            }

          })
        }
        <div className="w-full mt-10">
        <CodeEditor setCode = {setCode} setLanguageapi={setLanguageapi} setId ={setId}/>
        <div className="flex justify-end mt-6 gap-6 mr-8">
          <button className=" bg-[#454545] text-white p-2 rounded-md" onClick={handleClick}>Run</button>
          <SubmitComponent 
          
          code={code}
          id={id}
          slug ={params.slug}
          
          output={output}

          />
          
        <div>
          
        </div>
       
        </div>
        <div className='mt-14'>
        { !loading ? (
            <OutputComponent 
            testcase={testCase}
            output={output}
            actout={base64_decode(res)}
            />
        ):(
           <>Loading...</>
        )
          
        } 
          </div>
        </div>
        </div>
      </div>
    )
  }
  
  