import { BrowserRouter, Route, Routes } from "react-router-dom";

import WeatherCard from "./components/WeatherApp/WeatherCard";

import SingleOne from "./components/SingleCard/SingleOne";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherCard />} />
        <Route path="/aa" element={<SingleOne />} />
     
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
