import React, { useState } from "react";
import MovieCard from "./MovieCard";
import LoadingIndicator from "./loading";

export default function SearchMovies() {

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState();
    const [isLoading, setLoading] = useState(false);

    const searchMovies = async (e) => {
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?api_key=1a785e67408342d7cd21fe0f3db02ab2&language=en-US&query=${query}&page=1&include_adult=false`;

        if (query === '') return;

        setLoading(true);

        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
            console.log(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    function BuildView() {
        if (isLoading) {
            return <LoadingIndicator />
        } else {
            if (movies != null) {
                return (movies.length === 0 ? <center><p>No result</p></center> :
                    <div className="card-list">
                        {movies.filter(value => value.poster_path).map(movie => <MovieCard movie={movie} key={movie.id} />)}
                    </div>)
            }
        }

        return null;
    }

    return (
        <div>
            <center>
                <form className="form" onSubmit={searchMovies}>
                    <input className="input" type="text" name="query" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)}></input>
                    <button className="button" type="submit">Search</button>
                </form>
            </center>
            <BuildView />
        </div>
    )
}