import React, { use, useEffect,useState ,useRef} from 'react'
import './Weather.css'
import search_icon from '../assets/Search.png'
import cloud_icon from '../assets/cloud.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/drizzle_icon.png'
import wind_icon from '../assets/wind_icon.png'
import humidity_icon from '../assets/humidity_icon.png'
import clear_icon from '../assets/clear_icon.png'
import rain_icon from '../assets/rain_icon.png'
import snow_icon from '../assets/snow.png'
import sun_icon from '../assets/sun.png'
import hot_icon from '../assets/hot.png'



const Weather = () => {
  const inputRef=useRef()
   const [weatherData,setWeatherData]= useState(false);

   const allIcons={
    
     "01d": sun_icon,        // clear sky (day)
     "01n": hot_icon,        // clear sky (night)
     "02d": cloud_icon,      // few clouds (day)
     "02n": cloud_icon,      // few clouds (night)
    "03d": drizzle_icon,    // scattered clouds (day)
    "03n": drizzle_icon,    // scattered clouds (night)
     "04d": cloudy_icon,     // broken clouds (day)
     "04n": cloudy_icon,     // broken clouds (night)
      "09d": rain_icon,       // shower rain (day)
      "09n": rain_icon,       // shower rain (night)
     "10d": rain_icon,       // rain (day)
     "10n": rain_icon,       // rain (night)
     "11d": drizzle_icon,    // thunderstorm (day)
     "11n": drizzle_icon,    // thunderstorm (night)
     "13d": snow_icon,       // snow (day)
     "13n": snow_icon,       // snow (night)
     "50d": cloudy_icon,     // mist (day)
    "50n": cloudy_icon      // mist (night)

   }

   const search=async (city) =>{

    if(city==="")
    {
      alert("Please Enter City Name")
      return;
    }
    try{
       const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
       const response=await fetch(url);
       const data=await response.json();



       if(!response.ok)
       {
        alert(data.message);
        return;
       }
       console.log(data);
       const icon=allIcons[data.weather[0].icon] || clear_icon;
       setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon:icon
       })
    }
    catch(error)

    {
        setWeatherData(false);
        console.error("Error in fetching weather data");

    }
   }
    useEffect(()=>{
      search("Siberia");
    },[])
  return (
    <div className='weather'>
        <div className="search-bar">
          <input ref={inputRef} type='text' placeholder='Search' onKeyDown={
            e=>{
              if(e.key==="Enter")
              {
                search(inputRef.current.value);
              }
            }
          } />
          <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
          </div>
          {weatherData?<>
             <img src={weatherData.icon} alt="" className='weather-icon'></img>   {/* if anything not work whole app not work */}
          <p className='temperature'>{weatherData.temperature}<sup>o</sup>C</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt=""/>
                   <div>
                    
                    
                    <span>{weatherData.humidity}</span>
                    <p>Humidity</p>
                   </div>
            </div>
            <div className='col'>
               <img src={wind_icon} alt=""/>
                   <div>
                   
                    
                    <span>{weatherData.windSpeed}</span>
                    <p>Wind Speed</p>
                   </div>
            </div>
          </div>
          
          
          
          
          </>:<></>}
          
  
      
    </div>

  )
}

export default Weather