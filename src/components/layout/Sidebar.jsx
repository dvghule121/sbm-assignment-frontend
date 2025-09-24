import { useState } from 'react';
import { FaDollarSign, FaChartBar, FaChartLine, FaUser } from 'react-icons/fa';

const Sidebar = ({ activeTab, onTabChange, user, onLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="app-title"><FaDollarSign /> Expense Tracker</h1>
      </div>
      
      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => onTabChange('expenses')}
        >
          <span className="nav-icon"><FaChartBar /></span>
          <span className="nav-text">Expenses</span>
        </button>
        
        <button 
          className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => onTabChange('reports')}
        >
          <span className="nav-icon"><FaChartLine /></span>
          <span className="nav-text">Reports</span>
        </button>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar"><FaUser /></div>
          <div className="user-details">
            <span className="username">{user.username}</span>
            <button onClick={onLogout} className="logout-link">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;