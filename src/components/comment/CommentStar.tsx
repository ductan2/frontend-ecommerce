import { FaStar } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid';
type Props = {
   setRating: (rating: number) => void
   setHoverStar: (hover: number) => void
   rating: number
   hoverStar: number
}

export const CommentStar = ({setHoverStar,setRating,rating,hoverStar}:Props) => {
   

   return (
      <>
         <div>
            {[...Array(5)].map((_, i) => {
               const currentStar = i + 1;

               return <label className='comment-rating' key={uuidv4()}>
                  <input type="radio" name='rating' value={currentStar} onClick={() => setRating(currentStar)} />
                  <FaStar size={30} className='star'
                     color={currentStar <= (hoverStar || rating) ? "#ffc107" : "#e4e5e9"}
                     onMouseEnter={() => setHoverStar(currentStar)}
                     onMouseLeave={() => setHoverStar(0)}
                  />
               </label>
            })}
         </div>
      </>
   )
}
