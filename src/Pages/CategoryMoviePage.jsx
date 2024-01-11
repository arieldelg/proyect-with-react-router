import { useParams } from "react-router-dom"
import { fetchMovieDataBase } from "../Utils/api"
import { useEffect, useState } from "react"
import { LayoutMoviePage } from "../Layouts/LayoutMoviePage"

const CategoryMoviePage = ({ saveMovietoFavorites, items, deleteMovieFromFavorites }) => {
    const url = useParams()
    const { name, id } = url
    const [dataMovie, setDataMovie] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [nextPage, setNextPage] = useState(1)
    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])
    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller
        const fetchCategory = async () => {
            try {
                const response = await fetchMovieDataBase.get(`discover/movie?with_genres=${id}&page=${nextPage}`, signal)
                if(!response.status) throw new Error('Error en el LLamado API')
                setDataMovie(prev => [...prev, ...response.data.results])
            setHasNextPage(Boolean(response.data.total_pages))
            setError(null)
        } catch (error) {
            setError(error.message)
            if(signal.aborted) return
        } 
    }
    fetchCategory()
    return () => controller.abort()
    }, [nextPage])

    console.log('se esta ejecutando componente category page')  
    return (
        <div>
            {
                isLoading && <p>Estamos Cargando...</p>
            }
            {
                !error && !isLoading &&
                <LayoutMoviePage 
                data={dataMovie} 
                title={name} 
                setNextPage={setNextPage} 
                hasNextPage={hasNextPage} 
                saveMovietoFavorites={saveMovietoFavorites}
                items={items}
                deleteMovieFromFavorites={deleteMovieFromFavorites}
                />
            }
        </div>
    )
}

export { CategoryMoviePage }