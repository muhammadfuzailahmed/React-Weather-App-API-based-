import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [loader, setLoader] = useState(false)
  const [input, setInput] = useState("")
  const [temprature, setTemprature] = useState("")
  const [humidity, setHumidity] = useState("")
  const [feelsLike, setFellsLike] = useState("")
  const [description, setDescription] = useState("")
  const [currentWeather, setCurrentWeather] = useState("")
  const [city, setCity] = useState("")
  const [weatherIcon,setWeatherIcon] = useState("");
  const [loaded, setLoaded] = useState(false);

  let fetchData = async (city) =>  {
    try{
      if(input === "") {
        alert("fill the field");
      }
      else{
        setLoader(true)
        const apiKey = "2e160abef621deba0c77f178ed7c885c";
          let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
          let response = await fetch(url);
          let data = await response.json();
          let finalTemprature = (data.main.temp) - 273; 
          let finalFeelsLikeTemp = (data.main.feels_like) - 273; 
          const icon = data.weather[0].icon;
          let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            setTemprature((finalTemprature).toFixed(2));
            setHumidity(data.main.humidity);
            setFellsLike(finalFeelsLikeTemp);
            setDescription(data.weather[0].description)
            setCurrentWeather(data.weather[0].main)
            setCity(data.name)
            setWeatherIcon(iconUrl);
            setLoader(false)
            setLoaded(true);
            setInput("")
      }
    }catch(err) {
      alert("Invalid city");
      setLoader(false)
    }
  }


  function DisplayData() {
    if(loaded){
      return(
        <div className='w-[50%] m-auto'>
          <div className="img"><img className='w-20 m-auto' src={weatherIcon} alt="" /></div>
          <p className='font-bold mt-1 mb-0.5 text-white text-center text-2xl'>City: {city}</p>
          <p className=' font-bold mt-1 text-white'>Temprature: {temprature}°C</p>
          <p className='font-bold mt-1 text-white'>Humidity: {humidity}</p>
          <p className='font-bold mt-1 text-white'>Feel: {(feelsLike).toFixed(2)}°C</p>
          <p className='font-bold mt-1 text-white'>Description: {description}</p>
          <p className='font-bold mt-1 text-white'>Current Weather: {currentWeather}</p>
        </div>
      )
    }
  }


  return (
    <>
      <div className='w-full h-screen bg-[#19183B] flex justify-center items-center'>
          <div className='md:w-[30vw] w-[90vw] h-3/5 bg-[#708993] backdrop-blur-2xl rounded-2xl'>
            <h1 className='text-3xl text-center font-bold mt-2 mb-2 text-white'>Weather App</h1>
            <hr className='w-full h-1 bg-white' />
            <div className='text-center mt-8'>
              {/* City Input box */}
              <input type="text" 
              name=""
              id="" 
              onChange={(e) =>{
                setInput(e.target.value);
              }}
              placeholder='Enter city name'
              className='rounded-3xl border-[#E7F2EF] border-2 py-1 w-[20vw] px-2 text-white outline-none '
              />
              {/* Search Button */}
              <button onClick={() => {
                fetchData(input);
              }} className='border-2 border-[#E7F2EF] py-1 px-2 ml-1 rounded-3xl font-bold cursor-pointer text-[#E7F2EF] hover:text-[#A1C2BD] transition-all'>Search</button>
              </div>
            {loader && <p className='text-center font-bold mt-5 text-white'>Loading data...</p>}
            {/* display data */}
            <DisplayData />              
          </div>
      </div>
    </>
  )
}

export default App
