'use client'
import { useEffect, useState } from "react";

export default function ProblemsetContainer(){
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

    return (
        <>
        <div className="bg-white shadow-lg   mt-2 w-[60.4em] h-[40em] rounded-lg problem-flex-container">
            <ul className="flex flex-col mt-8 ml-20 gap-8" >
            {
               !loading ? (problemdata.map((problems,index)=>
                    <div key={index} className="">
                   <button className="mb-4">{problems.title}</button>
                   <hr className="mt-4 w-[50em]" ></hr>
                   </div>
                
                )):(
                    <>loading...</>
                )
                
            }
            </ul>
        </div>
        </>
    )
}