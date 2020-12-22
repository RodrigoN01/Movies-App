import { useEffect, useState } from 'react';

import Movie from './components/Movie';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = async (API) => {
    const moviesRes = await fetch(API);
    const moviesData = await moviesRes.json();

    setMovies(moviesData.results);
  };

  useEffect(() => {
    fetchMovies(API_URL);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      fetchMovies(SEARCH_API + searchTerm);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            className='search'
            type='search'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
      </header>
      <div className='movie-container'>
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
