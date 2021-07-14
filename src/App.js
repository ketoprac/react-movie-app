import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=b14fffb2`; 

    const response = await fetch(url);
    const responseJson = await response.json();

    
    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    if(movieFavourites) {
      setFavourites(movieFavourites)
    }
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.ImdbID !== movie.ImdbID
      );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container movie-app">
      <div className="header">
        <MovieListHeading heading="Movies" />
        <SearchBox setSearchValue={setSearchValue}/>
      </div>
      <div className="movie-container">
        <MovieList 
          movies={movies} 
          favouriteComponent={AddFavourites}
          handleFavouritesClick={addFavouriteMovie} 
        />
      </div>
      <div className="header">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="movie-container">
        <MovieList 
          movies={favourites} 
          favouriteComponent={RemoveFavourites}
          handleFavouritesClick={removeFavouriteMovie} 
        />
      </div>
    </div>
  );
}

export default App;
