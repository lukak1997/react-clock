import { useState ,useEffect} from "react";
import "./App.css";
import sun from './desktop/icon-sun.svg'
import down from './desktop/icon-arrow-down.svg'
import up from './desktop/icon-arrow-up.svg'
import axios from "axios";
import moon from './desktop/icon-moon.svg'
import { type } from "os";



interface ResponseData {
  country_name: string;
  country_code: string;
  time_zone: string;
  
}


function App( ) {


  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible,setIsVisible]=useState<boolean>(false)
  const [data,setData]=useState<ResponseData |null>(null)


   
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
        const resp =async()=>  {
      try {

        const response=await axios.get(`https://api.ipbase.com/v1/json/`)
        const data=await response.data
        setData(data)
            console.log('api', data)
      } catch (error) {
        alert('error')

      }
    
    }

    resp()
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  function getWeek(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(((date.getTime() - onejan.getTime()) / millisecsInDay + onejan.getDay() + 1) / 7);
  }
  const weekNumber =getWeek(currentTime)
  function getDayOfYear(date: Date):number {
    const startOfYear:Date = new Date(date.getFullYear(), 0, 0);
    const diff:number = ( date.getTime()) + ((startOfYear.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay:number = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
  const newDate=getDayOfYear(currentTime)
  return (
    <div className={ currentTime.getHours()>=23||currentTime.getHours()<11 ? 'App night':"App day" } >
     <div className="shadow">
     { isVisible? null:<div className="container1">
        <div>
          <p className="paragraph">
            “The science of operations, as derived from mathematics more
            especially, is a science of itself, and has its own abstract truth
            and value.”
          </p>
          <h2 className="header">Ada Lovelace</h2>
        </div>
      </div> }
     <div className="container2">
           <div className="clock-wraper">
            <div className=" icon-wraper">
             <img src={currentTime.getHours()>=23||currentTime.getHours()<11 ? moon : sun}></img>
            <p className="para2"> {currentTime.getHours()>=23||currentTime.getHours()<11  ?'GOOD NIGHT': 'GOOD MORNING'}, IT’S CURRENTLY</p>
            </div>
            
            <h1>{currentTime.toLocaleTimeString()}</h1>
            <div className="btn-wraper">
            <span className="country">{`In ${ data&& data.country_name}, ${data&& data.country_code}`}</span>
            <div className="btn"> <button className="btn-1" onClick={() =>{setIsVisible(!isVisible)  }}>{isVisible? 'LESS':"MORE"} <div className="cr"><img src={isVisible?down:up}/></div></button></div>
            </div>
           
           </div>
      </div>
         
      {isVisible? <  div className="container3">
        <div className="main-wraper">
          <div className="first-div">
            <span className="span1">CURRENT TIMEZONE</span>
            <h1 className="header2">{data && data.time_zone}</h1>
            <span className="span2">Day of the year</span>
            <h1 className="digit">{newDate}</h1>
             </div>
             <div className="black"></div>
             <div className="second-div">
              <span className="span3">Day of the week</span>
              <h1 className="digit2">{currentTime.getDay()}</h1>
              <span className="span4">Week number</span>
              <h1 className="digit3">{weekNumber}</h1>
             </div>

        </div>
      </div>:null}
       </div>
    </div>
  );
}

export default App;
