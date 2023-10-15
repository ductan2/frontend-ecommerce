import { FaStar } from 'react-icons/fa'

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
            {[...Array(5)].map((star, i) => {
               const currentStar = i + 1;

               return <label className='comment-rating'>
                  <input type="radio" name='rating' value={currentStar} onClick={() => setRating(currentStar)} />
                  <FaStar size={30} className='star'
                     color={currentStar <= (hoverStar || rating) ? "#ffc107" : "#e4e5e9"}
                     onClick={() => setHoverStar(currentStar)}
                  />
               </label>
            })}
         </div>
      </>
   )
}
