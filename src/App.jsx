import {useEffect, useState} from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard.jsx";


const Api_URL="http://www.omdbapi.com?apikey=9b8e7448";

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")

    const searchMovies= async (title)=>{
        const response=await fetch(`${Api_URL}&s=${title}`);
        const data=await response.json();

        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies("avengers")
    },[])


    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={(e)=>{
                        setSearchTerm(e.target.value);
                    }}
                />
                <img
                    src={SearchIcon}
                    alt="Search icon"
                    onClick={()=>searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie,index)=>(
                                    <MovieCard key={index} movie={movie}/>
                            ))}
                        </div>
                    ):(
                        <div className="empty">
                            <h2>No Movies Found</h2>
                        </div>
                    )
            }


        </div>
    )
}
export default App
