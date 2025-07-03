import React, { useEffect, useState } from 'react';
import { Movie } from './Movie.model';

const TheNextMarvelMovie = () => {

    const api = 'https://whenisthenextmcufilm.com/api';

    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        fetch(api)
            .then(response => response.json())
            .then((data: Movie) => setMovie(data));
    }, []);

    return (
        <div>
            <h1>The Next Marvel Movie:</h1>
            <h2>{ movie?.title }</h2>
            <img data-testid="cover" src={movie?.poster_url} alt={`${movie?.title} cover`} />
        </div>
    )
}

export default TheNextMarvelMovie;