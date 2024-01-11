import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchMovieDataBase } from "../Utils/api"
import { LayoutMoviePage } from "../Layouts/LayoutMoviePage"

const SearchPage = ({ saveMovietoFavorites, items, deleteMovieFromFavorites }) => {
    const url = useParams()
    const { name } = url
    const [searchData, setSearchData] = useState([])
    const [error, setError] = useState([])
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        setSearchData([])
        setPage(1)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [name])
    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller
        const fetchSearch = async () => {
            try {
                const response = await fetchMovieDataBase.get(`search/movie?query=${name}&page=${page}`, signal)
                if(!response.status) throw new Error('Error en el llamado API')
                console.log(response.data)
                setSearchData(prev => [...prev, ...response.data.results])
                setHasNextPage(true)
                setError(null)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchSearch()
        
        return () => controller.abort()
    
    },[name, page])
    return (
       <div>
        {
            isLoading && <p>Estamos Cargando...</p>
        }
        {
            !isLoading &&
                <>
                    <h1 className="pt-8 text-4xl font-bold">Resultados o Similares de '{name}':</h1>
                    <LayoutMoviePage 
                    data={searchData} 
                    setNextPage={setPage} 
                    hasNextPage={hasNextPage}
                    items={items}
                    deleteMovieFromFavorites={deleteMovieFromFavorites}
                    saveMovietoFavorites={saveMovietoFavorites}
                    />    
                </>
        }
       </div> 
    )
}
export { SearchPage }