import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  Text,
  VStack,
  Button,
  Container,
  Grid
  
  
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate()

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedWeather, setSavedWeather] = useState([]);
 console.log(weatherData)
  useEffect(() => {
    if (!city) {
      return;
    }

    setLoading(true);
    setError(null);

    // OpenWeatherMap API URL
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    // Your OpenWeatherMap API key
    const apiKey = '7301e0523e98055089a273d50286f58e';

    axios
      .get(apiUrl, { params: { q: city, appid: apiKey } })
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setError('Unable to fetch weather data. Please try again.');
        setLoading(false);
      });
  }, [city]);

  const handleSave = () => {
    if (weatherData) {
      setSavedWeather([...savedWeather, weatherData]);
      setWeatherData(''); 
      setCity("")
    }
  };

  const handleLogout = ()=>{
    navigate("/login")
  }

  const SavedWeatherCard = ({ saved }) => (
    <Container
      
      flexDirection="column"
      backgroundColor="#d7b2b2"
      borderRadius="8px"
      boxShadow="0px 0px 5px rgba(0, 0, 0, 0.1)"
      p="20px"
      mb="10px"
      alignItems="center"
    >
       <Text as="b" >City : {saved.name}</Text>
      <h3>Weather Temperature</h3>
      <p>Temperature: {saved.main.temp} K</p>
      <h3>Weather Description</h3>
      <p>Weather Description: {saved.weather[0].description}</p>
    </Container>
  );

  return (
    <>
    <Box w="full" align="end" p="10px" >
      <Button onClick={handleLogout}>
        LogOut
      </Button>
    </Box>
    <Box
      textAlign="center"
      backgroundColor="#f5f5f5"
      p="20px"
      fontFamily="Arial, sans-serif"
      maxW="400px"
      mx="auto"
      borderRadius="8px"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
    >
      <VStack spacing="20px">
        <h1>Weather App</h1>
        <Box>
          <Input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            size="lg"
          />
        </Box>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : weatherData ? (
          <div>
             <Text as="b" >City : <span>{weatherData.name}</span></Text>
            <h2>Weather Temperature</h2>
            <p>Temperature: {weatherData.main.temp} K</p>
            <h2>Weather Description</h2>
            <p>Weather Description: {weatherData.weather[0].description}</p>
            <Button onClick={handleSave}>Save</Button>
          </div>
        ) : null}
      
      
      </VStack>

    </Box>
    <Grid templateColumns='repeat(3, 1fr)' w="800px" m="auto" gap={6}  mt="100px">
    {savedWeather.map((saved, index) => (
          <SavedWeatherCard key={index} saved={saved} />
        ))}
    </Grid>
    </>
  );
};

export default Home;
