import React from 'react'
import useGenere from '../hooks/useGenere'

const GenereList = () => {
    const {genere} = useGenere(); 
  return (
    <ul>
        {genere.map(genre => <li key={genre.id}>
            {genre.name}
        </li>)}
    </ul>
  )
}

export default GenereList