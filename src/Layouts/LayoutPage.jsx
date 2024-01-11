import { Outlet } from 'react-router-dom'
import { NavBar } from '../NavBar'

const LayoutPage = ({ setNextPage, search, setSearch, requestToken }) => {
    return (
        <>
        <NavBar setNextPage={setNextPage} search={search} setSearch={setSearch} requestToken={requestToken}/>   
        <main className='w-screen flex justify-center flex-col max-w-6xl m-auto items-center altura'>
            <Outlet/>
        </main>
        </>
      )
}

export { LayoutPage }