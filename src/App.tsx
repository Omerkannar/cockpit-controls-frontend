import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import ExternalApi from "./external-api/external-api";
import { CockpitControl } from './components/Cockpit-Controls/CockpitControl';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={'/Cockpit-controls'} element={<CockpitControl />} />
      <Route path={'/'} element={<CockpitControl />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
