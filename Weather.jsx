import { useEffect, useRef, useState } from 'react'
import './Weather.css'
import SearchIcon from '@mui/icons-material/Search'
import { Button } from '@mui/material';
import cloudy_icon from '../assets/cloudy.png'
import humidity_icon from '../assets/drop.png'
import clearsky_icon from '../assets/clearsky.png'
import scatteredclouds_icon from '../assets/scatteredclouds.png'
import fewclouds_icon from '../assets/fewclouds.png'
import brokenclouds_icon from '../assets/brokenclouds.png'
import mist_icon from '../assets/mist.png'
import showerrain_icon from '../assets/showerrain.png'
import thunderstorm_icon from '../assets/thunderstorm.png'
import snow_icon from '../assets/snow.png'
import storm_icon from '../assets/storm.png'


export default function Weather(){

    const inputRef = useRef()
    const[weatherData,setWeatherData]=useState(false);

    const allicons = {
        "01d" : clearsky_icon,
        "01n" :clearsky_icon,
        "02d" :fewclouds_icon,
        "02n" :fewclouds_icon,
        "03d" :scatteredclouds_icon,
        "03n" :scatteredclouds_icon,
        "04d" :brokenclouds_icon,
        "04n" :brokenclouds_icon,
        "09d" :showerrain_icon,
        "09n" :showerrain_icon,
        "10d" :cloudy_icon,
        "10n" :cloudy_icon,
        "11d" :thunderstorm_icon,
        "11n" :thunderstorm_icon,
        "13d" :snow_icon,
        "13n" :snow_icon,
        "50d" :mist_icon,
        "50n" :mist_icon,
    }
    const search = async (city)=> {
        if(city===""){
            alert("Enter City Name.")
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            console.log("API Key:", import.meta.env.VITE_APP_ID);

            const icon = allicons[data.weather[0].icon] || clearsky_icon;
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })
        }
        catch(error){
            setWeatherData(false);
            console.error("Error in fetching data.");
        }
    }

    useEffect(()=>{
        search("London");
    },[])

    
    
    
    
    return(
        <>
            <div className="container">
                <div className="card" >
                    <div className='search_bar'>
                        <input ref={inputRef} type="text" placeholder="Search"/>
                        <Button onClick={() => search(inputRef.current.value)}><SearchIcon/></Button>
                    </div>
                    {weatherData?<>
                    <img src={weatherData.icon} alt=''></img>
                    <p className='temp'>{weatherData.temperature}°C</p>
                    <p className='place'>{weatherData.location}</p>
                    <div className='humiditywind'>
                        <div className='col'>
                            <img src={humidity_icon} alt=''></img>
                            <p> {weatherData.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                        <div className='col'>
                        
                            <img src={storm_icon} alt=''></img>
                            <p> {weatherData.windSpeed} kmph</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                    </>:<></>}
                </div>
            </div>  
        
        </>
    );
}