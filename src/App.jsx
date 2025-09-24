import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Sidebar from './components/layout/Sidebar'
import MainContent from './components/layout/MainContent'
import useAuth from './hooks/useAuth'
import './App.css'

function App() {
  const { user, loading, logout: handleLogout } = useAuth()
  const [showLogin, setShowLogin] = useState(true)
  const [activeTab, setActiveTab] = useState('expenses')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (user) {
    return (
      <div className="app-layout">
        <Sidebar 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          user={user}
          onLogout={handleLogout}
        />
        <MainContent 
          activeTab={activeTab}
          user={user}
          onLogout={handleLogout}
        />
      </div>
    )
  }

  return (
    <div className="App">
      {showLogin ? (
        <Login 
          switchToRegister={() => setShowLogin(false)} 
        />
      ) : (
        <Register 
          switchToLogin={() => setShowLogin(true)} 
        />
      )}
    </div>
  )
}

export default App
