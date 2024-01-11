import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CategoryCard } from "../Cards/CategoryCard";
import { fetchMovieDataBase } from "../Utils/api";
import { LayoutWatchProviderImg } from "../Layouts/LayoutWatchProviderImg";
import { ActorCard } from "../Cards/ActorCard";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/24/solid'
import { MovieCard } from "../Cards/MovieCard";

const MovieDetail = ({ saveMovietoFavorites, items, deleteMovieFromFavorites }) => {
    const url = useParams()
    const { id } = url
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [streaming, setStreaming] = useState([])
    const [actorsPreview, setActorsPreview] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const movieDetail = async () => {
            const response = await fetchMovieDataBase.get(`movie/${url.id}`, null)
            try {
                setData(response.data)
            } catch (error) {
                setError(response.message)
            } finally {
                setIsLoading(false)
            }
        }
        
            movieDetail()
    }, [id])

    useEffect(() => {
        const streamingProvider = async () => {
            const response = await fetchMovieDataBase.get(`movie/${url.id}/watch/providers`, null)
            try {
                const findMX = Object.keys(response?.data?.results).find(element => element === "MX")
                
                if(Object.keys(response.data.results).length === 0) {
                    setStreaming(response.data.results)
                } else if (findMX === undefined){
                    setStreaming(false)
                } else {
                    setStreaming(response.data.results['MX']) 
                }
            } catch (error) {
                setError(response.message)
            }
        }
        streamingProvider()

    }, [id])

    useEffect(() => {
        const actors = async () => {
            const response = await fetchMovieDataBase.get(`movie/${url.id}/credits`, null)
            try {
                const preview = response.data.cast.slice(0, 9)
                setActorsPreview(preview)
            } catch (error) {
                setError(response.message)
            }
        }
        actors()
    }, [id])

    useEffect(() => {
        const fetchSimilars = async () => {
            const response = await fetchMovieDataBase.get(`movie/${url.id}/similar`, null)
            try {
                setSimilarMovies(response.data.results)
            } catch (error) {
                setError(response.message)
            }
        }
        fetchSimilars()
    }, [id])

    const render = () => {
        if (Object.keys(streaming).length === 0 && streaming !== false && data.homepage?.length !== 0) {
            return (
                <p className="text-lg font-medium">No disponible para streaming por el momento, solo en Cines</p>
            )
        } else if (!streaming ) {
            return(
                <p className="text-xl font-medium">NO DISPONIBLE EN TU REGION</p>
            )
        } else if (streaming.flatrate) {
            return(
                streaming.flatrate.map(element => {
                    return <LayoutWatchProviderImg logo_path={element.logo_path} provider_name={element.provider_name} key={element.provider_name}/>
                })
            )
        } else if (!streaming.flatrate) {
            return (
                <p className="text-xl font-medium">N/A</p>
            )
        } 
    }
    const slideLeft = () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 600
    }
    const slideRight = () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 600
    }
    const slideLeftMovies = () => {
        const slider = document.getElementById('sliderMovies')
        slider.scrollLeft = slider.scrollLeft - 600
    }
    const slideRightMovies = () => {
        const slider = document.getElementById('sliderMovies')
        slider.scrollLeft = slider.scrollLeft + 600
    }
    const imageBackdrop = () => {
        if(data.backdrop_path === null) {
            return(
                <img src={'https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg?w=996'} alt={data.original_title} className="relative w-full h-[700px]"/>
            )
        } else {
            return(
                <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} alt={data.original_title} className="relative w-full"/>
            ) 
        }
    }
    const average = () => {
        const average = data.vote_average
        const rounded = average?.toFixed(1)
        return rounded
    }
    return (
        <div>
            {
                error && <p>{error}</p>
            }
            {
                isLoading && <p>Estamos Cargando..</p>
            }
            {
                !error && !isLoading &&
                <div className="w-full altura">
                    {imageBackdrop()}
                    <div className="bg-slate-500 max-w-6xl w-full">
                        <div className="flex justify-between px-8 py-4">
                            <h1 className="text-4xl font-bold">{data.title}</h1>
                            <div className="flex items-center justify-between gap-2">
                            <StarIcon className="w-10 text-yellow-500"/>
                            <p className="text-3xl font-semibold">{average()}</p>
                            </div>
                        </div>
                        <div className=" w-full flex">
                            <p className="text-xl font-semibold text-justify w-3/5 pl-8">{data.overview?.length !== 0 ? data.overview : '-'}</p>
                            <div className=" text-lg font-medium w-2/5 pl-48">
                                <p className="">Budget: {data.budget !== 0 ? `$${data.budget}` : 'N/A'}</p>
                                <p>Revenue: {data.revenue !== 0 ? `$${data.revenue}` : 'N/A'}</p>
                                <p>Duration: {data.runtime !== 0 ? `${data.runtime}min` : 'N/A'}</p>
                                <p>Release Date: {data.release_date?.length !== 0 ? data.release_date : 'N/A' }</p>
                            </div>
                        </div>
                        <div className="py-4 px-8">
                            <h1 className="text-3xl font-bold">Generos</h1>  
                            <ul className="py-4 grid grid-cols-4">
                                {
                                    data.genres?.map(element => {
                                        return <CategoryCard data={element} key={element.id}/>
                                    })
                                }
                            </ul>
                        </div>
                        <h2 className="text-2xl px-8 pb-4 font-semibold">Streaming:</h2>
                        <div className="px-8 pb-4 flex gap-3">
                            {render()} 
                        </div>
                        <div>
                            {
                                (streaming.buy) &&
                                <>
                                    <h2 className="px-8 pb-4 text-xl font-medium">Buy:</h2>
                                    <div className="px-8 flex gap-4 pb-4">
                                    {
                                        streaming.buy.map(element => {
                                            return <LayoutWatchProviderImg logo_path={element.logo_path} provider_name={element.provider_name} key={element.provider_name}/>
                                        })
                                    }
                                    </div>
                                </>
                            }
                            {
                                (streaming.rent) &&
                                <>
                                    <h2 className="text-xl px-8 py-4 font-medium">Rent:</h2>
                                    <div className="flex px-8 gap-4 pb-8">
                                    {
                                        streaming.rent.map(element => {
                                            return <LayoutWatchProviderImg logo_path={element.logo_path} provider_name={element.provider_name} key={element.provider_name}/>
                                        })
                                    }
                                    </div>
                                </>
                            }
                            {
                                (streaming.ads) &&
                                <>
                                    <h2 className="px-8 text-xl py-4 font-medium">TV Streaming:</h2>
                                    <div className="flex px-8 gap-4 pb-4">
                                        {
                                            streaming.ads.map(element => {
                                                return <LayoutWatchProviderImg logo_path={element.logo_path} provider_name={element.provider_name} key={element.provider_name} />
                                            })
                                        }
                                    </div>
                                </>
                            }
                        </div>
                        <h3 className="text-2xl font-semibold px-8 pt-10">Actors</h3>
                        {
                            actorsPreview.length === 0 && 
                            <p className="px-8 py-4 text-xl font-semibold">No actors in Data Base</p>
                        }
                        {
                            actorsPreview.length > 0 &&
                            <div className="px-8 py-4 pb-8 h-[350px] w-full flex">
                                <ChevronLeftIcon className="w-[55px] opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeft}/>
                                <div className='h-full w-full overflow-x-scroll scroll-smooth snap-x' id="slider">
                                    <div className="flex w-max h-4/5">
                                        {
                                            actorsPreview.map(element => {
                                                return <ActorCard data={element} key={element.id}/>
                                            })
                                        }
                                        
                                    </div>
                                </div>
                                <ChevronRightIcon className="w-[55px] opacity-50 cursor-pointer hover:opacity-100" onClick={slideRight}/>
                            </div>        
                        }
                        <div className="pb-8">
                            <h2 className="text-2xl font-bold px-8 pb-8">Peliculas Similares</h2>
                            <div className="flex items-center h-[350px] w-full">
                                <ChevronLeftIcon className="w-[55px] opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeftMovies}/>
                                <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth" id="sliderMovies">
                                    <div className="flex w-max h-max">
                                    {
                                        similarMovies.map(element => {
                                            return <MovieCard 
                                            data={element} 
                                            key={element.id}
                                            items={items}
                                            saveMovietoFavorites={saveMovietoFavorites}
                                            deleteMovieFromFavorites={deleteMovieFromFavorites}
                                            />
                                        })
                                    }
                                    </div>
                                </div>
                                <ChevronRightIcon className="w-[55px] opacity-50 cursor-pointer hover:opacity-100" onClick={slideRightMovies}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export { MovieDetail }