import React from 'react';

const MovieList = ({movies, favouriteComponent, handleFavouritesClick}) => {
  const FavouriteComponent = favouriteComponent;
  
  return (
    <>
     {movies && movies.map((movie, index) => (
     <div key={index} className="image-container">
       <img src={movie.Poster} alt="movie"></img>
        <div 
          onClick={() => handleFavouritesClick(movie)}
          className="overlay"
        >
         <FavouriteComponent />
       </div>
     </div>
     ))} 
    </>
  )
}

export default MovieList