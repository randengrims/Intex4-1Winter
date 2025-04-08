import { useEffect, useState } from "react";

function GenreFilter({selectedGenres,setSelectedGenres}:{selectedGenres: string[];setSelectedGenres: (genres: string[]) => void;}){

    const [genres,setGenres] = useState<string[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try{
            const response = await fetch('https://localhost:5000/api/Movie/GetGenres')
            const data = await response.json();
            console.log('Fetched Genres:',data)
            setGenres(data);
            }
            catch(error){
                console.error('Error fetching Genres', error)
            }
        }

        fetchGenres();
    }, []);

    function handleCheckboxChange({target}:{target: HTMLInputElement}){
        const updatedGenres = selectedGenres.includes(target.value) ? selectedGenres.filter(x => x !== target.value) : [...selectedGenres,target.value];

        setSelectedGenres(updatedGenres);
    }

    return(
        <div className="category-filter">
            <h5>Project Types</h5>
            <div className="category-list">
                {genres.map((c) =>(
                    <div key={c} className="category-item">
                        <input type="checkbox" id={c} value={c} className="category-checkbox" onChange={handleCheckboxChange}/>
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GenreFilter;