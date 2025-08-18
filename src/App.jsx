import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SearchView from './components/SearchView.jsx';
import MyListView from './components/MyListView.jsx';
import AuthStatus from './components/AuthStatus.jsx';
import { onAuthChange } from './services/authService.js';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthChange((authState) => {
      setUser(authState.isSignedIn ? authState.user : null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <header style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h1>🎌 Yuna - Anime List Manager</h1>
          <AuthStatus />
        </header>
        
        {user ? (
          <>
            <nav>
              <Link to="/">Search</Link> | <Link to="/mylist">My List</Link>
            </nav>
            <Routes>
              <Route path="/" element={<SearchView user={user} />} />
              <Route path="/mylist" element={<MyListView user={user} />} />
            </Routes>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Please sign in to access your anime list</h2>
            <p>Use the authentication controls above to sign in or create an account</p>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
