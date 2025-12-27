import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function SearchBox({updateInfo}){
    let[city , setCity] = useState("");
    let[error , setError] = useState(false);

    let API_URL = "https://api.openweathermap.org/data/2.5/weather";
    let API_KEY = "53d012432256d80c49ad0959ee54ff09";
    
    let getWeatherInfo = async() => {
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`); 
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            let result = {
                city : city,
                temp : jsonResponse.main.temp,
                tempMin : jsonResponse.main.temp_min,
                tempMax : jsonResponse.main.temp_max,
                humidity : jsonResponse.main.humidity,
                feelsLike : jsonResponse.main.feels_like,
                weather : jsonResponse.weather[0].description,
            }

            console.log(result);
            return result;
        }catch(err){
            throw err;
        }
    }


    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {
        try{
            evt.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        }catch(err){
            setError(true);
        }
    }


    return(
        <div>
            <h3>Search for the weather</h3>
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" value={city} onChange={handleChange} />
                <br></br>
                <br></br>
                <Button variant="contained" type='submit'> 
                    Search
                </Button>
                <br />
                {error && <p style={{color : "red"}}> No such place exist!!</p>}
            </form>
        </div>
    )
}