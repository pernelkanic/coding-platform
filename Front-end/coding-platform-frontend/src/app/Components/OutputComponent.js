export default function OutputComponent({testcase, output,actout}){
    return(
        <div className="bg-black text-white pb-20 ">
            <p className="pt-10 m-6">Output:</p>
            <div className="pl-20">
            <p>Test Cases  : {testcase}</p>
            <p>Expected Output:{output}</p>
            <p>User Output:{actout}</p>
            </div>
        </div>
    )
} 