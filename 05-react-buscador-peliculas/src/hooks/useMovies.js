import responseMovies from '../mocks/with-results.json'
import withoutResult from '../mocks/no-results.json'

export function useMovies () {
  const movies = responseMovies.Search

  const mappedMovies = movies?.map(movies => ({
    id: movies.imdbID,
    title: movies.title,
    year: movies.Year,
    poster: movies.Poster
  }))

  return { movies: mappedMovies }
}
