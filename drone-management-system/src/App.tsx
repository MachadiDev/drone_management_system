import { Routes, Route } from 'react-router'
import DroneList from './pages/drones/DroneList'
import Homepage from './pages/homepage/homeapage'
import DroneCadastro from './pages/drones/droneCadastro'
import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const views = {
    loading: <h1>Loading...</h1>,
    error: <h1>Error</h1>,
    homepage: <Homepage />,
    dronesList: <DroneList />,
    droneCadastro: <DroneCadastro />
  }

  if (loading) return views.loading;
  if (error) return views.error;

  return (
    <Routes>
      <Route path="/" element={views.homepage} />
      <Route path="/drones" element={views.dronesList} />
      <Route path="/drones/cadastro" element={views.droneCadastro} />
    </Routes>
  )
}

export default App
