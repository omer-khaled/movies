import { useContext,useState, useEffect } from "react";
import { context, pagecontext } from "../ContextApi";
import CreateMovie from "./CreateMovie";
function Movies(){
    let [movies,setMovies] = useContext(context);
    let [page,setPage] = useContext(pagecontext);
    let [geners,setGeners] = useState([]);
    let [satrt,setStart] = useState(0);
    let [end,setEnd] = useState(0);
    let [filters,setFilters] = useState([]);
    let [active,setActive] = useState(false);
    let [activee,setActivee] = useState(false);
    let [filterDone,setFilterDone] = useState(1);
    let [progress,setprogress] = useState(false);
    let [type,setType] = useState(0);
    useEffect(()=>{
        getDat();
        getApi(filters);
    },[filterDone])
    const getDat = async()=>{
        let gene = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=a2c15389053ce787b46de9c88f045902');
        let res = await (gene).json();
        setGeners([...res.genres]);
    }
    const Filter = (e)=>{
        let filtered = Number(e.target.getAttribute("number-id"));
        setFilters([...(new Set([...filters,filtered]))]);
    }
    const notFilter = (e)=>{
        let filtered = Number(e.target.getAttribute("number-id"));
        let index = filters.indexOf(filtered);
        filters.splice(index,1);
        setFilters([...filters]);
    }
    const getApi = async(filters)=>{
        let fe = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=a2c15389053ce787b46de9c88f045902&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${filters.join(',')}`)
        let res = await fe.json();
        filteration([...(res.results)]);
    }
    const filteration = (mo)=>{
        let startye = Number(satrt);
        let endye = Number(end);
        if(startye!==0||endye!==0){
            let FilterdMovies = mo.filter((el)=>{
                let exactYear = Number((String(el.release_date)).slice(0,4));
                console.log((startye<=exactYear)&&(exactYear<=endye) , "     ", exactYear);
                return (startye<=exactYear)&&(exactYear<=endye);
            });
            setMovies([...FilterdMovies]);
        }else{
            setMovies([...mo]);
        }
        if(filterDone !== 1){
            setprogress(true);
            stopProgress();
        }
    }
    const sortCustom = (type)=>{
        if(type===0){
            let sorted = movies.sort((a,b)=>{
                let aYear = (String(a.release_date)).slice(0,4);
                let bYear = (String(b.release_date)).slice(0,4);
                if(aYear>bYear){
                    return 1;
                }else{
                    return -1;
                }
            });
            setMovies([...sorted]);
        }else if(type===1){
            let sorted = movies.sort((a,b)=>{
                let aYear = (String(a.release_date)).slice(0,4);
                let bYear = (String(b.release_date)).slice(0,4);
                if(aYear>bYear){
                    return -1;
                }else{
                    return 1;
                }
            });
            setMovies([...sorted]);
        }else if(type===2){
            let sorted = movies.sort((a,b)=>{
                let aYear = Number(String(a.vote_average));
                let bYear = Number(String(b.vote_average));
                if(aYear<bYear){
                    return 1;
                }else{
                    return -1;
                }
            });
            setMovies([...sorted]);
        }else if(type===3){
            let sorted = movies.sort((a,b)=>{
                let aYear = Number(String(a.vote_average));
                let bYear = Number(String(b.vote_average));
                if(aYear>bYear){
                    return 1;
                }else{
                    return -1;
                }
            });
            setMovies([...sorted]);
        }
    }
    const stopProgress = ()=>{
        let handel = setInterval(() => {
                clearInterval(handel);
                setprogress(false);
        }, 400);
    }
    return(
        <>
            <div className="bar">
                {(progress===false)?
                    <div className="progress"></div>:
                    <div className="progress active"></div>
                }
            </div>
            <div className="layout">
                <div className="sidebar">
                    <div className="filters">
                        <div className="head-filter">
                            <span>Filters</span>
                            <i className="bi bi-caret-right-fill" onClick={(e)=>{
                                if(!(e.target.classList.contains('ac'))){
                                    e.target.className = 'bi bi-caret-down-fill';
                                    e.target.classList.add('ac');
                                    setActive(true);
                                }else{
                                    e.target.className = 'bi bi-caret-right-fill';
                                    e.target.classList.remove('ac');
                                    setActive(false);
                                }
                            }}></i>
                        </div>
                        {(active!==false)&&
                            <>
                                <div className="list-gener">
                                    <p className="ge">Geners:</p>
                                    {(geners.length!=0)&&geners.map(el=>{
                                        return((filters.includes(Number(el.id)))?
                                        <span className="gener active" key={el.id} number-id={el.id} onClick={(e)=>{
                                                if((e.target.classList).contains('active')){
                                                    notFilter(e);
                                                    e.target.classList.remove('active');
                                                }else{
                                                    e.target.classList.add('active');
                                                    Filter(e);
                                                }
                                        }}>
                                            {el.name}
                                        </span>:<span className="gener" key={el.id} number-id={el.id} onClick={(e)=>{
                                                if((e.target.classList).contains('active')){
                                                    notFilter(e);
                                                    e.target.classList.remove('active');
                                                }else{
                                                    e.target.classList.add('active');
                                                    Filter(e);
                                                }
                                        }}>
                                            {el.name}
                                        </span>);}
                                    )}
                                </div>
                                <div className="form-filter">
                                    <div>
                                        <label  >Start Year:</label>
                                        <input className="form-control w-25" value={satrt} type={"number"} id='from' onInput={(e)=>{
                                            setStart(e.target.value);
                                            // filteration(movies);
                                        }}/>
                                    </div>
                                    <div>
                                        <label >End Year</label>
                                        <input className="form-control w-25" value={end} type={"number"} id='to' onInput={(e)=>{
                                            setEnd(e.target.value);
                                            // filteration(movies);
                                        }}/>
                                    </div>
                                    <button className="btn btn-primary" onClick={()=>{
                                        getApi(filters);
                                        setFilterDone(filterDone+1);
                                    }}>Filter</button>
                                </div>
                            </>
                        }
                    </div>
                    <div className="sorts">
                        <div className="head-sort">
                            <span>Sort</span>
                            <i className="bi bi-caret-right-fill" onClick={(e)=>{
                                if(!(e.target.classList.contains('ac'))){
                                    e.target.className = 'bi bi-caret-down-fill';
                                    e.target.classList.add('ac');
                                    setActivee(true);
                                }else{
                                    e.target.className = 'bi bi-caret-right-fill';
                                    e.target.classList.remove('ac');
                                    setActivee(false);
                                }
                            }}></i>
                        </div>
                        {(activee!==false)&&
                            <div className="sort-body">
                                <p>Sort Results</p>
                                <select defaultValue={'the oldest First'} onChange={(e)=>{
                                    if(e.target.value === 'the oldest First'){
                                        setType(0);   
                                    }else if(e.target.value === 'the newest First'){
                                        setType(1);   
                                    }else if(e.target.value === 'the top rated First'){
                                        setType(2);   
                                    }else if(e.target.value === 'the lowest rated First'){
                                        setType(3);   
                                    }
                                }}> 
                                    <option value={'the oldest First'}>the oldest First</option>
                                    <option value={'the newest First'}>the newest First</option>
                                    <option value={'the top rated First'}>the top rated First</option>
                                    <option value={'the lowest rated First'}>the lowest rated First</option>
                                </select>
                                <button className="btn btn-primary" onClick={()=>{
                                        sortCustom(type);
                                }}>Sort</button>
                            </div>
                        }
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        {((movies.length)!=0)?movies.map((element)=>{
                            return(
                                <CreateMovie key={element.id} movie={element}/>
                            );
                        }):<div className="empty"></div>}
                    </div>
                    <button className="btn btn-primary w-50 my-3" onClick={()=>{
                        setPage(page+1);
                    }}>Show More</button>
                </div>
            </div>
        </>
    )
}
export default Movies;