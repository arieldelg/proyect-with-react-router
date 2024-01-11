import { MovieCard } from "../Cards/MovieCard"
import { CategoryCard } from "../Cards/CategoryCard"
import { NavLink } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { HomePageLS } from "../LoadingSkeltetonComponents/HomePageLS"

const  HomePage = ({ dayTrendingMovie, genreList, isLoading, saveMovietoFavorites, items, deleteMovieFromFavorites }) => {
    const slideLeft = () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 900
    }
    const slideRight = () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 900
    }

    const slideLeftFav = () => {
        const slider = document.getElementById('sliderfav')
        slider.scrollLeft = slider.scrollLeft - 900
    }
    const slideRightFav = () => {
        const slider = document.getElementById('sliderfav')
        slider.scrollLeft = slider.scrollLeft + 900
    }
    return (
        <>
            {
                isLoading &&
                <HomePageLS/>
            }
            {
                !isLoading &&
                <div className="w-full">
                    <div className="flex justify-between w-full py-4 items-center px-[55px]">
                        <h1 className="text-4xl font-bold">Tendencias</h1>
                        <NavLink to={'tendencias'} className={'bg-white px-2 py-1 rounded-md'}>
                            <button className="text-xl">Ver Mas</button>
                        </NavLink>
                    </div>
                    <div className="flex items-center h-[350px] w-full">
                        <ChevronLeftIcon className="w-[55px] opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeft}/>
                        <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth" id="slider">
                            <div className="flex w-max h-max">
                                {
                                    dayTrendingMovie.map(element => {
                                        return <MovieCard data={element} key={element.id} saveMovietoFavorites={saveMovietoFavorites} items={items} deleteMovieFromFavorites={deleteMovieFromFavorites}/>
                                    })
                                }
                            </div>
                        </div>
                        <ChevronRightIcon className="w-[55px] opacity-50 cursor-pointer hover:opacity-100" onClick={slideRight}/>
                    </div>
                
                    <div className="w-full pl-[55px]">
                        <h1 className="text-4xl font-bold py-2">Generos</h1>
                        <ul className='grid grid-cols-4 py-2'>
                            {
                                genreList.map(element => {
                                    return <CategoryCard data={element} key={element.id}/>
                                })
                            }
                        </ul>
                    </div>
                    <div className="w-full pl-[55px]">
                        <h1 className="text-4xl font-bold py-8">Tus Favoritos</h1>
                        {
                            items.length > 0 &&
                            <div className="flex items-center h-[350px] w-full">
                                <ChevronLeftIcon className="w-[55px] opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeftFav}/>
                                <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth" id="sliderfav">
                                    <div className="flex w-max h-max">
                                        {
                                            items.map(element => {
                                                return <MovieCard data={element} key={element.id} saveMovietoFavorites={saveMovietoFavorites} items={items} deleteMovieFromFavorites={deleteMovieFromFavorites}/>
                                            })
                                        }
                                    </div>
                                </div>
                                <ChevronRightIcon className="w-[55px] opacity-50 cursor-pointer hover:opacity-100" onClick={slideRightFav}/>
                            </div>    
                        }
                        {
                            items.length === 0 && <p className="text-2xl font-semibold py-12">No tienes ninguna pelicula en favoritos por el momento</p>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export { HomePage }