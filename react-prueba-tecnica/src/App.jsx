import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'
// const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com/cat/says/hello'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [factErrror, setFactError] = useState()

  const getRandomFact = () => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => {
      // TODO: HANDLE ERROR IF !RES.OK
        if (!res.ok) { setFactError('No se ha podido recuperar la cita') }
        return res.json()
      })
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }

  useEffect(getRandomFact, [])

  useEffect(() => {
    if (!fact) return

    const threeFirstWord = fact.split(' ', 3).join()
    fetch(`https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])

  const handleClick = () => {
    getRandomFact()
  }

  return (
    <main className=''>
      <h1>App de Gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first words for ${fact} `} />}
    </main>
  )
}
