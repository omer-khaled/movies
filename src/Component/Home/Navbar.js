import { useState , useContext} from "react";
import { context, pagecontext } from "../ContextApi";

function Navbar(){
    let [query,setQuery] = useState('');
    let [,setMovies] = useContext(context);
    let [page] = useContext(pagecontext);
    const getData = async (link)=>{
        let featched = await fetch(link);
        let res = await featched.json();
        setMovies([...(res.results)]);
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">OMovies</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="d-flex ms-auto" onSubmit={(e)=>{
                    e.preventDefault();
                    let link = `https://api.themoviedb.org/3/search/movie?api_key=a2c15389053ce787b46de9c88f045902&language=en-US&page=${page}&include_adult=false&query=${query}`
                    getData(link);
                }}>
                    <input id="searching" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onInput={(e)=>{
                        setQuery(e.target.value);
                    }}/>
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;