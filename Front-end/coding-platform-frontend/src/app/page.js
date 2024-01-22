
import AboutBarComponent from "./Components/AboutBarComponent";
import BlackBarComponent from "./Components/BlackBarComponent";



export default function Home() {
  
  return (
    <main className=" about-flex-container ">
    
      <BlackBarComponent/>

      <AboutBarComponent />
      
      {/* <CodeEditor/> */}
    </main>
  )
}
