//import React from 'react'
import "./App.css"
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css" 

function App() {

  const imagenes = [
    {
      original: "https://acdn.mitiendanube.com/stores/002/304/650/products/mci-3810359786316620088-b27d209396dcb4568117308262387271-1024-1024.webp",
      thumbnail: "https://acdn.mitiendanube.com/stores/002/304/650/products/mci-3810359786316620088-b27d209396dcb4568117308262387271-1024-1024.webp"
    },
    {
      original :"https://cloud10.todocoleccion.online/juguetes-antiguos-juegos-coleccion/tc/2015/09/23/17/51442089.jpg",
      thumbnail: "https://cloud10.todocoleccion.online/juguetes-antiguos-juegos-coleccion/tc/2015/09/23/17/51442089.jpg"
    },
    {
      original: "https://m.media-amazon.com/images/I/414rB0Y1KpL._SL500_.jpg",
      thumbnail: "https://m.media-amazon.com/images/I/414rB0Y1KpL._SL500_.jpg",
    }
  ]


  return (
  <>
    <div style= {{width: "40vw", margin: "auto"}}>
      <ImageGallery
      items = {imagenes}
      showPlayButton = {true}

      showFullscreenButton = {false} //activar o desactivar boton de pantalla completa
      showThumbnails = {true} //imagen miniatura, de la imagen carusel
      thumbnailPosition="left" //posicion de la imagen miniatura
      showBullets = {true} //pequeños circulos que indican la cantidad de imagenes
      slideInterval={3000} //tiempo que va a ir rotando cada imagen
      slideDuration={1000} //tiempo que va a tardar hacer la trnasicion 
      
      /> 
    </div>

  </>

  )
}

export default App