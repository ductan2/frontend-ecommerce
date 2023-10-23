
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { debounce } from "debounce";
type props ={
   price:{
      value:{
         min:number,
         max:number
      }
   },
   setPrice:React.Dispatch<React.SetStateAction<{ value: { min: number; max: number; }; }>>
}
export const RangePrice = ({price,setPrice}:props) => {
   const handleChangePrice = debounce((e: number[]) => {
      setPrice({ value: { min: e[0], max: e[1] } });
   }, 500);
   if(!price) return null
   return (
      <>
         <Slider
            range
            allowCross={false}
            defaultValue={[price.value.min, price.value.max]}
            min={0}
            max={500}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => handleChangePrice(e)}
         />

         <div className="d-flex justify-content-between">
            <span>
               {price.value.min}
            </span>
            <span>
               {price.value.max}
            </span>
         </div>

      </>
   );
}
