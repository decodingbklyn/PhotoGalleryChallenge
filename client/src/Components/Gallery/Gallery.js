import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import photoService from '../../services/photoService'

export default function Gallery(props){
    const [photos, setPhotos] = useState(null)
    const [items , setItems ] = useState(20)
    const [hasMoreItems, setHasMore ] = useState(true)

    useEffect( ()=> {
      if(!photos){
        getPhotos()
      }
    })

    const getPhotos = async () => {
      let res = await photoService.getAll()
      setPhotos(addPhotoAttrs(res.data))
    }

    const addPhotoAttrs = (photos)=> {
       const list = photos.map( photo =>  {
        const getDimension = photo.slice(photo.length - 7).split('/')
        const photoData = {
          src: photo,
          greysrc: `${photo}?grayscale`,
          height: getDimension[0],
          width: getDimension[1]
        }
        return photoData
      })
      return list
    }

    const createPhoto = (photo) => {
      return (
        <React.Fragment>
          <div className="gallery-img__container">
            <img  className="gallery-img" src={(props.isGrey) ? photo.src : photo.greysrc } alt={photo.src}/>
            <div  className="gallery-img__btn-container">
              <button className="gallery-img__btn" onClick={handleClick}>greyscale</button>
            </div>
          </div>
        </React.Fragment>
      )
    }

    const handleClick = (e) => e.target.closest('div.gallery-img__container').classList.toggle('greyscale')
    
    const showItems = () => {
      var imgs = []
      if(photos && photos.length > 0){
        for (var i = 0; i < items; i++) {
          imgs.push(createPhoto(photos[i])) 
        }
        return imgs
      } 
    }

    const loadMore = () => {
      if(items === 50 ) {
        setHasMore(false)
      } else {
          setItems(items + 10)
      }
    }

    const loader = <div className='loader' style={{color: 'black'}} key={0}>Loading...</div>
    
    return (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMoreItems}
          loader={loader}
          useWindow={false}
          className='gallery__container'
        >
            { showItems() }
        </InfiniteScroll>
    )
} 
