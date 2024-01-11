import { LayoutPage } from './Layouts/LayoutPage.jsx'
import { AboutPage } from './Pages/AboutPage.jsx'
import { ProfilePage } from './Pages/ProfilePage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './Pages/HomePage.jsx'
import { RatingPage } from './Pages/RatingPage.jsx'
import { MovieDetail } from './Pages/MovieDetail.jsx'
import { CategoryMoviePage } from './Pages/CategoryMoviePage.jsx'
import { fetchMovieDataBase } from './Utils/api.js'
import { SearchPage } from './Pages/SearchPage.jsx'
import './App.css'
import { useEffect, useState } from 'react'
import { LogIn } from './Pages/LogIn.jsx'
import { useLocalStorage } from './LocalStorage/useLocaleStorage.jsx'

const App = () => {
  const [dayTrendingMovie, setDayTrendingMovie] = useState([])
  const [genreList, setGenreList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [nextPage, setNextPage] = useState(1)
  const [search, setSearch] = useState('')
  const {
    items,
    saveMovietoFavorites,
    deleteMovieFromFavorites
  } = useLocalStorage('myMovieApp', [])
  
  useEffect(() => {
    setIsLoading(true)

    const fetchTrending = async () => {
      const response =  await fetchMovieDataBase.get(`trending/movie/day?`, null)
      try {
        setDayTrendingMovie(response.data.results)
      } catch (error) {
        setError(response.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTrending()
  }, [])

  useEffect(() => {
    const fetchCategoryMovie = async () => {
      console.log()
      const response = await fetchMovieDataBase.get('genre/movie/list', null)
        try {
          setGenreList(response.data.genres)
        } catch (error) {
          setError(response.message)
        }
    }
    fetchCategoryMovie()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPage error={error} setNextPage={setNextPage} isLoading={isLoading} search={search} setSearch={setSearch}/>}>
          <Route path='/proyect-with-react-router' element={<HomePage dayTrendingMovie={dayTrendingMovie} genreList={genreList} isLoading={isLoading} saveMovietoFavorites={saveMovietoFavorites} items={items} deleteMovieFromFavorites={deleteMovieFromFavorites}/>}/>
          <Route path='/proyect-with-react-router/login' element={<LogIn/>} />
          <Route path='/proyect-with-react-router/about' element={<AboutPage/>}/>
          <Route path='/proyect-with-react-router/profile' element={<ProfilePage/>}/>
          <Route 
            path='/proyect-with-react-router/tendencias/' 
            element={<RatingPage 
              saveMovietoFavorites={saveMovietoFavorites} 
              items={items} 
              deleteMovieFromFavorites={deleteMovieFromFavorites}
            />}
          />
          <Route 
            path='/proyect-with-react-router/:name/:id' 
            element={<CategoryMoviePage 
              saveMovietoFavorites={saveMovietoFavorites} 
              items={items} 
              deleteMovieFromFavorites={deleteMovieFromFavorites}
            />}
          />
          <Route 
            path='/proyect-with-react-router/movie/:id' 
            element={<MovieDetail
              saveMovietoFavorites={saveMovietoFavorites} 
              items={items} 
              deleteMovieFromFavorites={deleteMovieFromFavorites}
            />}
          />
          <Route 
            path='/proyect-with-react-router/search/:name' 
            element={<SearchPage
              saveMovietoFavorites={saveMovietoFavorites} 
              items={items} 
              deleteMovieFromFavorites={deleteMovieFromFavorites}
            />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
