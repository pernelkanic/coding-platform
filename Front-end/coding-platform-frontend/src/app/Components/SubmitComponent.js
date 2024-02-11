import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { encode as base64_encode } from 'base-64';
import { useState } from "react";
import { TestCases } from "../Constants/TestCases";

export default function SubmitComponent ({code , id ,slug}) {
    let[loading, setLoading]= useState(false);
    const[testCase , setTestCase] = useState(null);
   const[output , setOutput] = useState(null);
   let[token, setToken] = useState(null);
   let[res, setres] = useState("");
   let[status, setStatus] = useState(null)
   let[data,setData] = useState(null);
   const {  userId} = useAuth();
    async function handleSubmit(){
        setLoading(true);
        TestCases.forEach((el)=>{
          
          if(el.title === slug){
            
            
            setTestCase(el.testcase + " " + el.inputs);
            console.log(testCase)
            setOutput(el.outputs)
            
          }
        })
        
   
  
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
            'X-RapidAPI-Key': 'c57044529amsh40f0210b6269090p1e8d62jsn94da47e1fa32',
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
          await setToken(response.data);
          setLoading(false);
          await getResult(token);
        
          if(status === 'Accepted'){
            saveDb()
          }
          
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
                'X-RapidAPI-Key': 'c57044529amsh40f0210b6269090p1e8d62jsn94da47e1fa32',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
              }
            };
  
            try {
              const response = await fetch(geturl, getoptions);
              const result = await response.text();
              if(JSON.parse(result).stdout != null){
              console.log(JSON.parse(result).status.description);
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
async function saveDb (){
    let backdata={
        Name:slug,
        Code:code,
        Status:status
    }
    
    await fetch(`http://localhost:5000/api/Submit/${userId}`, {
            method: 'POST',
            body: JSON.stringify(backdata),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => setData(data));
       
}
 return (
    <div>
        <button className="bg-[#2CBB5D] text-white p-2 rounded-md" onClick={handleSubmit}>Submit</button>
        <div className='mt-3'>
        { !loading && data && status == 'Accepted'? (
           <>Your Solution is Accepted</>
        ):(
           <></>
        )
          
        }  
        </div>
  
    </div>
 )   
}
