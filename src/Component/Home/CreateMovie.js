import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
function CreateMovie({movie}){
    let img = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
    return(
        <div className="card-parent">
            <div className="card" key={movie.id}>
                <img src={`${img}`} alt={`${movie.original_title}`} />
                <Link className='link' to={`/movies/${movie.id}`}>
                    <div className="icon">
                        <i className="bi bi-eye-fill"></i>
                    </div>
                </Link>
                <CircularProgressbar className='precentage' value={((movie.vote_average)*10)} text={`${`${Number(Number((movie.vote_average)).toFixed(1))}`}`}/>
            </div>
            <p className="card-title">{movie.original_title}</p>
            <div className="details">
                <span className="one">{'Year : '}<span>{(String(movie.release_date)).slice(0,4)}</span></span>
                <span className="one">{'Language : '}<span>{(movie.original_language)=='en'?'English':'Others'}</span></span>
            </div>
        </div>
    );
}
export default CreateMovie;