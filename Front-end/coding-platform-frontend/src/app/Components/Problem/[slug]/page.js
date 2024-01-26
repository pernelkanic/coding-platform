'use client'
import axios from 'axios';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { useEffect, useState } from "react";
import CodeEditor from "../../CodeEditor";
export default function ProblemsSets  ({params})  {
  let[problemdata, setproblemdata] = useState([]);
   let[loading, setLoading]= useState(false);
  let[code, setCode] = useState("");
  let[token, setToken] = useState(null);
  let[res, setres] = useState("");
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
          'X-RapidAPI-Key': 'c57044529amsh40f0210b6269090p1e8d62jsn94da47e1fa32',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
          language_id: 62,
          source_code: base64_encode(code),
        }
      };
      
      try {
        const response = await axios.request(options);
        await setToken(response.data);
       
        getResult(token)
      } catch (error) {
        console.error(error);
      }
    }
   async function getResult({token}){
    const geturl = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;
          const getoptions = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'c57044529amsh40f0210b6269090p1e8d62jsn94da47e1fa32',
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
          };

          try {
            const response = await fetch(geturl, getoptions);
            const result = await response.text();
            setres(JSON.parse(result).stdout);
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
                <p className="text-center   text-xl mt-4">{problem.title}</p>
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
        <CodeEditor setCode = {setCode} />
        <div className="flex justify-end mt-6 gap-6 mr-8">
          <button className=" bg-[#454545] text-white p-2 rounded-md" onClick={handleClick}>Run</button>
          <button className="bg-[#2CBB5D] text-white p-2 rounded-md">Submit</button>
        </div>
          {
           base64_decode(res)
          }
        </div>
        </div>
      </div>
    )
  }
  
  