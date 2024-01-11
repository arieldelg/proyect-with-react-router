import { FilmIcon } from '@heroicons/react/24/solid'

import { NavLink, useNavigate } from 'react-router-dom'

const NavBar = ({ setNextPage, search, setSearch, requestToken }) => {
    const navigate = useNavigate()
    const toSearch = (event) => {
    event.preventDefault()
    navigate(`search/${search}`)
    setSearch('')
    }
    return (
        <nav 
        className='flex w-screen h-10 bg-white justify-between px-2 items-center min-w-min'
        >
            <NavLink to={'/react-router-dom-V6.4'} onClick={() => setNextPage(1)}>
                <FilmIcon className='w-10 h-10'/>
            </NavLink>
            <form onSubmit={toSearch} className='w-4/5'>
                <input 
                type="text"
                autoFocus
                placeholder='Search Here'
                className='border border-black w-full min-w-max px-2 rounded-md h-8'
                onChange={(event) => setSearch(event.target.value)}
                value={search}
                />
            </form>
            <div className='w-40 flex justify-evenly'>
              <NavLink to={'/react-router-dom-V6.4/about'}>About</NavLink>
              <NavLink to={'/react-router-dom-V6.4/profile'}>Profile</NavLink>
              <NavLink to={'/react-router-dom-V6.4/login'}>Login</NavLink>
            </div>
        </nav>
    )
}

export { NavBar }