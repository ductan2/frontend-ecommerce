import { UploadImageType } from "../../types/commom"
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
type ImageWrapProps = {
   images: UploadImageType[]
}
export const ImageWrap = ({ images }: ImageWrapProps) => {

   const [mainImage, setMainImage] = useState<string>(images[0].url)

   return (
      <>
         <div className="product-img product-img-zoom">
            <a>
               <img
                  className="default-img"
                  src={mainImage}
                  alt=""
               />
            </a>
         </div>
         <div className="gallery row">
            {images.map((item) => {
               return (
                  <div key={uuidv4()} className="col-3 gallery-box cursor-pointer mx-2" onClick={() => setMainImage(item.url)}>
                     <img src={item.url} />
                  </div>
               )
            })}
         </div>

      </>
   )
}
