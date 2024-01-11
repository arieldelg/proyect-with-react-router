
const API_URL = 'https://api.themoviedb.org/3/'

const options = (signal) => ({
    get: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGE1MjM1ODM0YzNjN2Q0NmFmYjE4YzViOTYzM2NjNCIsInN1YiI6IjY1MDM4NWJlNmEyMjI3MDExYTdjMmE1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rLchL40z0mZ5vv7UdQcYoqO8gNC1L7OEnfBTldabc4M' 
        }, 
        signal: signal
    }
})

const fetchMovieDataBase = {
    options: {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGE1MjM1ODM0YzNjN2Q0NmFmYjE4YzViOTYzM2NjNCIsInN1YiI6IjY1MDM4NWJlNmEyMjI3MDExYTdjMmE1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rLchL40z0mZ5vv7UdQcYoqO8gNC1L7OEnfBTldabc4M' 
        },
        
    },
    get:    async function (url, signal = {}) {
            const response = await fetch(`${API_URL}${url}`, options(signal)['get'])
            const status = response.ok
            const data = await response.json()
            if (!status) {
                const error = new Error('Error en el llamado API')
                const { message } = error
                return { message }
            } else {
                return { data, status }
            }
        },     
}


export { fetchMovieDataBase }