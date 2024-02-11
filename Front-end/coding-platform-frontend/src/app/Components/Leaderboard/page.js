'use client'

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
export default function Problems(){
    let[Dt, setDt] = useState([]);
    const { userId} = useAuth();
    useEffect(()=>{
            fetch(`http://localhost:5000/api/submit/${userId}`)
            .then(response => response.json())
            .then((data)=>{
                setDt(data.problemtitle)
             
                
            })
        },[])
    return(
        <>
            <div className=" flex flex-col justify-center items-center">
           
            <p className="mt-10">Solved Problems</p>
            <>
        <div className="bg-white shadow-lg   mt-2 w-[60.4em] h-[40em] rounded-lg problem-flex-container">
        <ul className="flex flex-col mt-8 ml-20 gap-8" >
            {Dt?(
            Dt.map((dt, index)=>{

                    return(<li key={index}>
                    {dt.Name } - {dt.Status}
                    <hr className="mt-4 w-[50em]"></hr>
                    </li>)
                
            })):(
                <>
                    There are No submitted Problems Right Now
                </>
            )
                
            }
            </ul>
        </div>
        </>
            </div>
        </>
    )
}