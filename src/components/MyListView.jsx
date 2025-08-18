import React, { useState, useEffect } from 'react';
import AnimeCard from './AnimeCard.jsx';
import { subscribeToAnimeList, updateAnimeEntry, deleteAnimeEntry } from '../services/animeService.js';
import './MyListView.css';

function MyListView({ user }) {
  const [animeList, setAnimeList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    
    const unsubscribe = subscribeToAnimeList(user.uid, (data, err) => {
      if (err) {
        setError('Failed to fetch anime list');
        setAnimeList([]);
      } else {
        setAnimeList(data);
        setError(null);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleUpdate = async (docId, updates) => {
    const result = await updateAnimeEntry(docId, updates);
    if (!result.success) {
      alert('Failed to update anime: ' + result.error);
    }
  };

  const handleDelete = async (docId) => {
    if (window.confirm('Are you sure you want to delete this anime?')) {
      const result = await deleteAnimeEntry(docId);
      if (!result.success) {
        alert('Failed to delete anime: ' + result.error);
      }
    }
  };

  return (
    <div className="mylist-view">
      <h2>My Anime List</h2>
      {!user && <p>Please sign in to view your anime list.</p>}
      {error && <p>{error}</p>}
      {user && animeList.length === 0 && !error && <p>No anime in your list yet.</p>}
      {user && (
        <div className="anime-grid">
          {animeList.map(anime => (
            <AnimeCard
              key={anime.docId}
              anime={anime}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListView;
