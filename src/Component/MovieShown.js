import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from 'react-youtube';
function MovieShown(){
    let {id} = useParams();
    let [movi,setmovi] = useState(null);
    let [played,setPlay] = useState(false);
    let navigator = useNavigate();
    useEffect(()=>{
            getData();
    },[])
    const getData = async()=>{
        let feacted = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a2c15389053ce787b46de9c88f045902&append_to_response=videos`);
        let res = await feacted.json();
        setmovi({...res});
    }
    return(
        <div className="poster">
            {(played===false)?(movi)?<div className="cover">
                <img src={`https://image.tmdb.org/t/p/w500/${movi.backdrop_path}`} alt={movi.title} />
                <div className="container">
                    <div className="row" >
                        <div className="contain">
                            <i className="bi bi-arrow-left-square-fill to-home" onClick={()=>{
                                navigator('/movies/');
                            }}></i>
                            <div className="sora">
                                <img  src={`https://image.tmdb.org/t/p/w500/${movi.poster_path}`} alt={movi.title} />
                            </div>
                            <div className="de">
                                <h3>{movi.title}</h3>
                                <ul>
                                    <li>
                                        <span><span>PG</span>{movi.release_date}</span>
                                    </li>
                                    {(movi.genres).map(el=>{
                                        return <li><span>{el.name}</span></li>;
                                    })}
                                </ul>
                                <div className="info">
                                    <CircularProgressbar className='pre' value={((movi.vote_average)*10)} text={`${Number(Number((movi.vote_average)).toFixed(1))}`}/>
                                    <span>User Score</span>
                                    <div className="play" onClick={()=>{
                                        setPlay(true);
                                    }}>
                                        <i className="bi bi-play-fill"></i>
                                        <span>Play Trailer</span>
                                    </div>
                                </div>
                                <p className="tag">{movi.tagline}</p>
                                <h3 className="ov">Overview</h3>
                                <p className="over">{movi.overview}</p>
                                <div className="images">
                                    {(movi.production_companies).map((e)=>{
                                        return(
                                                <div className="images-comp" key={e.id}>
                                                    <img src={`https://image.tmdb.org/t/p/w500/${e.logo_path}`} alt={e.name}/>
                                                    <p>{e.name}</p>
                                                </div>
                                        );
                                    })}
                                </div>
                            </div> 
                        </div>   
                    </div>
                </div>
                </div>:<div className="empty"></div>:
                <div>
                    <i className="bi bi-x close-icon" onClick={()=>{
                        setPlay(false);
                    }}></i>
                    <YouTube className=""
                    videoId={movi.videos.results[0].key}
                        contaonerClassName={"youtube-container"}
                        opts={{
                            playerVars:{
                                autoplay:1,
                                controls:0
                            }
                        }}
                    />
                </div>}
        </div>
    );
}
export default MovieShown;
