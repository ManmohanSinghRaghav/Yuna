import React from 'react';
import './AnimeCard.css';

function AnimeCard({ anime, onAdd, onUpdate, onDelete }) {
  return (
    <div className="anime-card">
      <img src={anime.imageUrl} alt={anime.title} className="anime-image" />
      <h3>{anime.title}</h3>
      {onAdd && (
        <button onClick={() => onAdd(anime)}>Add to My List</button>
      )}
      {onUpdate && (
        <div>
          <select
            value={anime.status}
            onChange={(e) => onUpdate(anime.docId, { status: e.target.value })}
          >
            <option value="Not Watched">Not Watched</option>
            <option value="Watching">Watching</option>
            <option value="Completed">Completed</option>
            <option value="Dropped">Dropped</option>
          </select>
          <input
            type="number"
            value={anime.episodesWatched}
            onChange={(e) =>
              onUpdate(anime.docId, { episodesWatched: Number(e.target.value) })
            }
            min="0"
          />
          <textarea
            value={anime.notes}
            onChange={(e) => onUpdate(anime.docId, { notes: e.target.value })}
            placeholder="Add notes..."
          />
          <button onClick={() => onDelete(anime.docId)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default AnimeCard;
