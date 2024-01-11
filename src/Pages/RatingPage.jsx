import { useState, useEffect } from "react"
import { LayoutMoviePage } from "../Layouts/LayoutMoviePage"
import { fetchMovieDataBase } from "../Utils/api"

const RatingPage = ({ saveMovietoFavorites, items, deleteMovieFromFavorites }) => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      },1000)
    }, [])

    useEffect(() => {
        console.log('se esta ejecutando el rating page')
        const controller = new AbortController()
        const { signal } = controller
    
        const fetchTrending = async () => {
            try {
              const response =  await fetchMovieDataBase.get(`trending/movie/day?page=${page}`, signal)
            setData(prev => [...prev, ...response.data.results])
            setHasNextPage(true)
          } catch (error) {
            setError(error.message)
          } 
        }

        fetchTrending()
        return () => controller.abort()
      }, [page])
    return (
        <>
        {
          isLoading && <p>Estamos Cargando...</p>
        }
        {
          !isLoading &&
          <LayoutMoviePage 
          data={data} 
          setNextPage={setPage} 
          title={'Tendencias'} 
          hasNextPage={hasNextPage} 
          saveMovietoFavorites={saveMovietoFavorites} 
          items={items} 
          deleteMovieFromFavorites={deleteMovieFromFavorites}
          />
        }
        </>
    )
}

export { RatingPage }