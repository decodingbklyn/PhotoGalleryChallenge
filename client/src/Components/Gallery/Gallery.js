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
      setPhotos(res)
    }
    
    const createPhoto = (photo) => {
      return (
        <React.Fragment>
          <div className="gallery-img__container">
            <img  className="gallery-img" src={(props.isGrey) ? photo.greysrc : photo.src } alt={photo.src}/>
            <div  className="gallery-img__btn-container">
                { (props.isGrey) ? '' :
                  <button className="gallery-img__btn" onClick={handleClick}>greyscale</button>
                }
            </div>
          </div>
        </React.Fragment>
      )
    }

    const handleClick = (e) => e.target.closest('div.gallery-img__container').classList.toggle('greyscale')
    
    const showItems = (photos) => {
      var imgs = []
      if(photos && photos.length > 0){
        for (var i = 0; i < items; i++) {
          if(!photos[i]) return imgs
          imgs.push(createPhoto(photos[i])) 
        }
        return imgs
      } 
    }

    const filterPhotos = (dimensions) => {
      var filtered = []
        if(photos && photos.length > 0 ){
           photos.filter( photo => {
              if(parseInt(photo.width) === dimensions.width && parseInt(photo.height) === dimensions.height){
                filtered.push(photo)
              } else if (photo.width === dimensions.width) {
                filtered.push(photo)
              } else if (photo.height === dimensions.height) {
                filtered.push(photo)
              } else {
                return false
              }
            })
        }
      return filtered
    }

    const loadMore = () => {
      if(items === 50 ) {
        setHasMore(false)
      } else {
        setTimeout(()=> {
          setItems(items + 10)
        }, 5000)
      }
    }

    const loader = <div className='loader' style={{color: 'black'}} key={0}>Loading...</div>
    
    const renderImages = (photos) => {
      if(props.useFilter && !props.reset){
        return showItems(filterPhotos(props.dimensions))
      } else if(props.reset && !props.useFilter) {
        return showItems(photos)
      } else {
        return showItems(photos) 
      }
    }


    return (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMoreItems}
          loader={loader}
          useWindow={false}
          className='gallery__container'
        >
            { renderImages(photos) }
        </InfiniteScroll>
    )
} 
