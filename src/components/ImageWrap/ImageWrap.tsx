import { UploadImageType } from "../../types/commom"

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
            {images.map((item, index) => {
               return <>
                  <div key={index+item.public_id} className="col-3 gallery-box cursor-pointer mx-2" onClick={()=>setMainImage(item.url)}>
                     <img key={index} src={item.url} />
                  </div>
               </>
            })}
         </div>

      </>
   )
}
