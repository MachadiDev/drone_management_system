import { Routes, Route } from 'react-router'
import DroneList from './pages/drones/DroneList'
import Homepage from './pages/homepage/homeapage'
import DroneCadastro from './pages/drones/droneCadastro'
import Navbar from './components/Navbar'
import PilotCadastro from './pages/pilots/pilotCadastro'
import PilotList from './pages/pilots/pilotList'
import AuxiliariesList from './pages/auxiliaries/auxiliariesList'
import AuxiliariesCadastro from './pages/auxiliaries/auxiliaresCadastro'
import { useState } from 'react'

function App() {
  const [loading] = useState(false);
  const [error] = useState(false);

  if (loading) return (
    <div className="app-loading">
      <h1>Loading System...</h1>
    </div>
  );

  if (error) return (
    <div className="app-error">
      <h1>Initialization Error</h1>
      <p>Please check your connection and try again.</p>
    </div>
  );

  return (
    <div className="app-root">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/drones" element={<DroneList />} />
        <Route path="/drones/cadastro" element={<DroneCadastro />} />
        <Route path="/pilots" element={<PilotList />} />
        <Route path="/pilots/cadastro" element={<PilotCadastro />} />
        <Route path="/auxiliaries" element={<AuxiliariesList />} />
        <Route path="/auxiliaries/cadastro" element={<AuxiliariesCadastro />} />
      </Routes>
    </div>
  )
}

export default App
