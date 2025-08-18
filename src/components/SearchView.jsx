import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard.jsx';
import { addAnimeToList } from '../services/animeService.js';
import './SearchView.css';

function SearchView({ user }) {
  const [query, setQuery] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced search
  useEffect(() => {
    if (!query) {
      setAnimeList([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
        const animeData = response.data.data.map(item => ({
          id: item.mal_id.toString(),
          title: item.title,
          imageUrl: item.images.jpg.image_url
        }));
        setAnimeList(animeData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch anime data');
        setAnimeList([]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleAdd = async (anime) => {
    if (!user) {
      alert('Please sign in to add anime to your list');
      return;
    }
    
    const result = await addAnimeToList(user.uid, anime);
    if (result.success) {
      alert(`${anime.title} added to your list!`);
    } else {
      alert('Failed to add anime: ' + result.error);
    }
  };

  return (
    <div className="search-view">
      <h2>Search Anime</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for anime..."
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="anime-grid">
        {animeList.map(anime => (
          <AnimeCard key={anime.id} anime={anime} onAdd={handleAdd} />
        ))}
      </div>
    </div>
  );
}

export default SearchView;
