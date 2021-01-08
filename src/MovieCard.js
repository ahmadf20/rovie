import React, { useState } from "react";

import Modal from 'react-bootstrap/Modal';
import LoadingIndicator from "./loading";

export default function MovieCard({ movie }) {
    const [modalShow, setModalShow] = useState(false);

    const [movieDetails, setData] = useState();
    const [isLoading, setLoading] = useState(false);

    const getMovieDetails = async () => {
        const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=1a785e67408342d7cd21fe0f3db02ab2&language=en-US`;

        setLoading(true);

        try {
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }


    function MyVerticallyCenteredModal(props) {
        function BuildView() {
            if (isLoading || movieDetails == null) {
                return <LoadingIndicator />
            } else {
                return (
                    <Modal.Body className="row container">

                        <img className="col-lg mb-sm-5 mb-lg-0"
                            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movieDetails.poster_path}`}
                            alt={movie.title + ' poster'} />


                        <div className="col-lg">
                            <h1>{`${movieDetails.original_title} (${movieDetails.release_date.substring(0,4)})`}</h1>

                            <div className='text-muted description'>{`${movieDetails.genres.map((v)=>v.name).join(',')} - ${movieDetails.runtime} m`}</div>

                            <br/>
                            <h6>Status</h6>
                            <div className="description">{movieDetails.status}</div>
                            
                            <br/>
                            <h6>Popularity</h6>
                            <div className="description">{movieDetails.popularity}</div>

                            <br/>
                            <h6>Original Title</h6>
                            <div className="description">{movieDetails.original_title}</div>
                            
                            <br/>
                            <div className="row">
                                <div className="col">
                                    <h6>Score (vote)</h6>
                                    <div className="description">{`${movieDetails.vote_average} (${movieDetails.vote_count})`}</div>
                                </div>
                                <div className="col">
                                    <h6>Bugdet</h6>
                                    <div className="description">{`$${movieDetails.budget}`}</div>
                                </div>
                                <div className="col">
                                    <h6>Revenue</h6>
                                    <div className="description">{`$${movieDetails.revenue}`}</div>
                                </div>
                            </div>
                            
                            <br/>
                            <h5>Overview</h5>
                            <div className="description">{movieDetails.overview}</div>

                        </div>

                    </Modal.Body>
                );
            }
        }

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Header closeButton></Modal.Header>

                <BuildView />
            </Modal>
        );
    }

    return (
        <div>
            <div className="card-item" onClick={() => { setModalShow(true); getMovieDetails(); }}>
                <img className="card-image"
                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                    alt={movie.title + ' poster'} />
                <div>
                    <h1>{movie.title}</h1>
                    <div className="description">{movie.overview.substring(0, 150)}</div>
                </div>
            </div>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)} />
        </div>
    );
}