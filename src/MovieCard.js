import React from "react";


export default function MovieCard({ movie }) {
    return (
        <div className="card-item">
            <img className="card-image"
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title + ' poster'}
            />
            <div>
                <h1>{movie.title}</h1>
                <div className="description">{movie.overview.substring(0, 150)}</div>
            </div>
        </div >
    );
}