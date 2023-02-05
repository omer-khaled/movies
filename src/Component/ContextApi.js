import { createContext, useEffect, useState} from 'react';
export let context = createContext();
export let pagecontext = createContext();
export default function ContextApi(props){
    let [movies,setMovies] = useState('');
    let [page,setPage] = useState(1);
    const link = `https://api.themoviedb.org/3/discover/movie?api_key=a2c15389053ce787b46de9c88f045902&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;
    useEffect(()=>{
        getData();
    },[page])
    const getData = async ()=>{
        let featched = await fetch(link);
        let res = await featched.json();
        setMovies([...movies,...(res.results)]);
    }
    return(
        <context.Provider value={[movies,setMovies]}>
            <pagecontext.Provider value={[page,setPage]}>
                {props.children}
            </pagecontext.Provider>
        </context.Provider>
    );
}
// https://api.themoviedb.org/3/genre/movie/list?api_key=a2c15389053ce787b46de9c88f045902