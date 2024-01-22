'use client'
import { useEffect, useState } from "react";
import CodeEditor from "../../CodeEditor";

export default function ProblemsSets  ({params})  {
  let[problemdata, setproblemdata] = useState([]);
   let[loading, setLoading]= useState(false);

    useEffect(()=>{
        setLoading(true);
        fetch("http://localhost:5000/api/problems")
        .then(response => response.json())
        .then((data)=>{
            setLoading(false);
            setproblemdata(data)
            
        })
    },[])
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
        <CodeEditor/>
        </div>
        </div>
      </div>
    )
  }
  
  