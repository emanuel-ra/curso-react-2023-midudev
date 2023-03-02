import { useCatImage } from '../hooks/useCatImage'

export function CatImage () {
  const { imageUrl } = useCatImage({ fact: 'cat' })
  return (
    <>
      {imageUrl && <img src={`${imageUrl}`} alt='Image extracted using the first words for' />}
    </>
  )
}
