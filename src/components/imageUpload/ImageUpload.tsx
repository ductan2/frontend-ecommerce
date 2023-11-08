import { RiDeleteBin6Line } from 'react-icons/ri'
import { Loading } from '../loading/Loading'

type props = {
   image?: string
   handleDeleteImage?: () => void
   isLoadingImage?: boolean
   className?: string
}

const ImageUpload = ({ image, handleDeleteImage, isLoadingImage, className }: props) => {
   return (
      <div className="image-upload ">
         {isLoadingImage ? <Loading isFull /> :
            <>
               {!image || image === undefined || image === "" ?
                  <img src={"assets/imgs/page/img-upload.png"} alt="img" style={{objectFit:"contain"}} className="img-fluid " />
                  :
                  <div onClick={handleDeleteImage} className=''>
                     <img src={image} alt="img" className={`img-fluid has-image mt-5 ${className}`} />
                     <RiDeleteBin6Line className="icon-upload-delete" />
                  </div>
               }
            </>
         }
      </div>
   );
};

export default ImageUpload;
1