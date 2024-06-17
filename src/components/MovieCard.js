import React from 'react'
import Card from 'react-bootstrap/Card';

const MovieCard = () => {
  return (
    <div style={{height : '9rem'}}>
        <Card style={{ width: '18rem', height : '100%' }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        </Card>
    </div>
  )
}

export default MovieCard