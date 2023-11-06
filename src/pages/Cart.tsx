import { Link } from "react-router-dom"
import { RootState, useAppDispatch } from "../store/store"
import { useEffect, useState } from "react";
import { appliedCoupon, cashOrderByPaypal, emptyCart, getCart, getInfoUser, removeToCartById, updateCartQuantity, updateUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { Loading } from "../components/loading/Loading";
import { debounce } from "debounce";
import { PayPalButton } from "react-paypal-button-v2";
import { getConfigPayment } from "../features/payment/paymentSlice";
import { SelectCustom } from "../components/select/SelectCustom";
import { toast } from "react-toastify";
// import random id 
import { v4 as uuidv4 } from "uuid";
import { Address } from "../types/user";


export const Cart = () => {

   const dispatch = useAppDispatch();

   const [totalCart, setTotalCart] = useState<number>(0)
   const [totalCartAfterDiscount, setTotalCartAfterDiscount] = useState<number>(0)
   const [sdkLoading, setSdkLoading] = useState<boolean>(false)
   const [cardMethod, setCardMethod] = useState<boolean>(false)
   const [provinceList, setProviceList] = useState([])
   const [districtList, setDistrictList] = useState([])
   const [wardsList, setWardsList] = useState([])
   const [currentAddress, setCurrentAddress] = useState<Address>({});
   const [coupon, setCoupon] = useState<string>("")
   const [address, setAddress] = useState<{ province: string, district: string, wards: string }>({
      province: "",
      district: "",
      wards: ""
   })
   useEffect(() => {
      dispatch(getCart())
   }, [dispatch])
   const { cart, isLoading } = useSelector((state: RootState) => state.user)
   const { data: dataPayment } = useSelector((state: RootState) => state.payment)
   const { user } = useSelector((state: RootState) => state.user)
   useEffect(() => {
      if (cart) {
         const total = cart.reduce((total, item) => {
            return total + item.cartTotal
         }, 0)
         setTotalCart(total)

         const totalAfterDiscount = cart.reduce((total, item) => {
            return total + (item.totalAfterDiscount !== 0 ? item.totalAfterDiscount : item.cartTotal)
         }, 0)
         setTotalCartAfterDiscount(totalAfterDiscount)
      }
   }, [cart])
   useEffect(() => {
      dispatch(getConfigPayment())
   }, [dispatch])
   const addPaypalScript = async (data: string) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
      script.async = true
      script.onload = () => {
         setSdkLoading(true)
      }
   }
   useEffect(() => {
      if (dataPayment) {
         if (!window.paypal) {
            addPaypalScript(dataPayment)
         }
         else setSdkLoading(true)
      }
   }, [dataPayment])

   const removeCart = (id: string) => {
      setTimeout(() => {
         dispatch(removeToCartById(id))
         setTimeout(() => {
            dispatch(getCart())
         }, 200)
      }, 500)
   }
   const updateCart = debounce((e: React.ChangeEvent<HTMLInputElement>, id: string, quantity: number) => {
      let value = e.target.value
      if (Number(value) < 1) value = "1";
      if (Number(value) > quantity) value = quantity.toString()
      if (typeof value === 'string') {
         dispatch(updateCartQuantity({ id, amount: Number(value) }))
         setTimeout(() => {
            dispatch(getCart())
         }, 500)
      }
   }, 500)
   const handleCheckOut = () => {
      if (Object.keys(currentAddress).length === 0) {
         toast.error("Please choose current address!")
         return;
      }
      dispatch(cashOrderByPaypal({ COD: true, address: currentAddress }))
      setTimeout(() => {
         dispatch(getCart())
      }, 200)
   }
   useEffect(() => {
      fetch('https://provinces.open-api.vn/api/')
         .then((response) => {
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            return response.json();
         })
         .then((data) => {
            setProviceList(data);
         })

   }, []);
   useEffect(() => {
      if (address.province) {
         fetch(`https://provinces.open-api.vn/api/d/search/?q=${address.province}`)
            .then((response) => {
               if (!response.ok) {
                  throw new Error('Network response was not ok');
               }
               return response.json();
            })
            .then((data) => {
               setDistrictList(data);
            })
      }
   }, [address.province])
   useEffect(() => {
      if (address.district) {
         fetch(`https://provinces.open-api.vn/api/w/search/?q=${address.district}`)
            .then((response) => {
               if (!response.ok) {
                  throw new Error('Network response was not ok');
               }
               return response.json();
            })
            .then((data) => {
               setWardsList(data);
            })
      }
   }, [address.district])
   const handleSetCoupon = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCoupon(e.target.value)
   }
   const handleSubmitCoupon = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(appliedCoupon(coupon)).then(() => {
         setCoupon("")
         dispatch(getCart())
      })
   }
   const handleChangeValue = (e: React.ChangeEvent<HTMLSelectElement>, option: string) => {
      if (option === "province")
         setAddress({ ...address, province: e.target.value })
      else if (option === "district") {
         setAddress({ ...address, district: e.target.value })
      }
      else {
         setAddress({ ...address, wards: e.target.value })
      }
   }
   const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>, adr: Address) => {
      if (e.target.checked) {
         setCurrentAddress(adr)
      }
      else {
         setCurrentAddress({})
      }
   }
   const handleAddAddress = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!address.district || !address.province || !address.wards) {
         toast.error("Please enter your address")
         return
      }


      dispatch(updateUser({ address: address })).then(() => {
         setTimeout(() => {
            dispatch(getInfoUser())
         }, 500)
      })
   }
   if (isLoading || !cart) return <Loading isFull />
   return (
      <>
         <main className="main">
            <div className="container mb-80 mt-50">
               <div className="row">
                  <div className="col-lg-8 mb-40">
                     <h1 className="heading-2 mb-10">Your Cart</h1>
                     <div className="d-flex justify-content-between">
                        <h6 className="text-body">There are <span className="text-brand">{cart.length}</span> products in your cart</h6>
                        <h6 className="text-body cursor-pointer" onClick={() => dispatch(emptyCart())}><div className="text-muted  text-red-hover "><i className="fi-rs-trash mr-5"></i>Clear Cart</div></h6>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-lg-8">
                     <div className="table-responsive shopping-summery">
                        <table className="table table-wishlist">
                           <thead>
                              <tr className="main-heading">
                                 <th scope="col" className="start pl-30" colSpan={2}>Product</th>
                                 <th scope="col">Unit Price</th>
                                 <th scope="col">Quantity</th>
                                 <th scope="col">Subtotal</th>
                                 <th scope="col" className="end">Remove</th>
                              </tr>
                           </thead>
                           <tbody>
                              {cart && cart.length > 0 && cart?.map((item) => (
                                 <tr key={item._id} >

                                    <td className="image product-thumbnail"><img src={item.product.images[0].url} alt="#" /></td>
                                    <td className="product-des product-name">
                                       <h6 className="mb-5"><Link className="product-name mb-10 text-heading" to={`/shop/product/${item.product._id}`}>{item.product.title}</Link></h6>
                                       <div className="product-rate-cover">
                                          <div className="product-rate d-inline-block">
                                             <div className="product-rating" style={{ width: item.product.rating_distribution * 20 + "%" }}>
                                             </div>
                                          </div>
                                          <span className="font-small ml-5 text-muted"> ({item.product.rating_distribution})</span>
                                       </div>
                                    </td>
                                    <td className="price" data-title="Price">
                                       <h4 className="text-body">${item.product.price} </h4>
                                    </td>
                                    <td className="text-center detail-info" data-title="Stock">
                                       <div className="detail-extralink mr-15">
                                          <div className="input-number">
                                             {item.product.quantity > 0 ? <input type="number" defaultValue={item.amount} min={1}
                                                max={item.product.quantity} onChange={(e) => updateCart(e, item._id, item.product.quantity)} /> :
                                                <input type="number" defaultValue={item.amount} aria-valuemin={0} min={0} max={item.product.quantity} disabled />
                                             }
                                          </div>
                                       </div>
                                    </td>
                                    <td className="price" data-title="Price">
                                       <h4 className="text-brand">${item.cartTotal} </h4>
                                    </td>
                                    <td className="action text-center cursor-pointer text-red-hover" data-title="Remove" onClick={() => removeCart(item._id)}><i className="fi-rs-trash"></i></td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                     <div className="divider-2 mb-30"></div>
                     <div className="cart-action d-flex justify-content-between">
                        <Link to={"/shop"} className="btn "><i className="fi-rs-arrow-left mr-10"></i>Continue Shopping</Link>
                     </div>
                     <form action="" onSubmit={handleAddAddress}>
                        <div className="row flex " style={{ alignItems: "end" }}>
                           <div className="col-3">
                              <SelectCustom defaultName={"Please enter your province"} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeValue(e, "province")} value={address.province} data={provinceList} />
                           </div>
                           <div className="col-3">
                              <SelectCustom defaultName={"Please enter your district"} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeValue(e, "district")} value={address.district} data={districtList} />
                           </div>
                           <div className="col-3">
                              <SelectCustom defaultName={"Please enter your wards"} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeValue(e, "wards")} value={address.wards} data={wardsList} />
                           </div>
                           <div className="col-3">
                              <button type="submit" className="btn ">Add address</button>
                           </div>
                        </div>
                     </form>

                  </div>

                  <div className="col-lg-4">
                     <div className="row mt-50">
                        <div className="col-lg-12">
                           <div className="p-40">
                              <h4 className="mb-10">Apply Coupon</h4>
                              <p className="mb-30"><span className="font-lg text-muted">Using A Promo Code?</span></p>
                              <form onSubmit={handleSubmitCoupon}>
                                 <div className="d-flex justify-content-between">
                                    <input className="font-medium mr-15 coupon" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetCoupon(e)}
                                       name="coupon" value={coupon} placeholder="Enter Your Coupon" />
                                    <button type="submit" className="btn"><i className="fi-rs-label mr-10"></i>Apply</button>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>

                     <div className="border p-md-4 cart-totals ml-30" style={{ minHeight: "550px" }}>
                        <div className="table-responsive">
                           <table className="table no-border">
                              <tbody>
                                 <tr>
                                    <td className="cart_total_label">
                                       <h6 className="text-muted">Subtotal</h6>
                                    </td>
                                    <td className="cart_total_amount">
                                       <h4 className="text-brand text-end">${totalCart}</h4>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td scope="col" colSpan={2}>
                                       <div className="divider-2 mt-10 mb-10"></div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="cart_total_label">
                                       <h6 className="text-muted">Shipping</h6>
                                    </td>
                                    <td className="cart_total_amount">
                                       <h5 className="text-heading text-end">Free </h5></td></tr> <tr>
                                    <td className="cart_total_label">
                                       <h6 className="text-muted">Discount</h6>
                                    </td>
                                    <td className="cart_total_amount">
                                       <h5 className="text-heading text-end"> - ${(totalCart - totalCartAfterDiscount).toFixed(2)}</h5></td>
                                 </tr>
                                 <tr>
                                    <td scope="col" colSpan={2}>
                                       <div className="divider-2 mt-10 mb-10"></div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="cart_total_label">
                                       <h6 className="text-muted">Total</h6>
                                    </td>
                                    <td className="cart_total_amount">
                                       <h4 className="text-brand text-end">${totalCartAfterDiscount}</h4>
                                    </td>
                                 </tr>

                              </tbody>
                           </table>
                        </div>
                        <br className="line" />
                        <div>
                           <h5>Delivery address</h5>
                           {user.address !== undefined && user.address?.length > 0 && user.address?.map((adr) => {
                              return <div key={uuidv4()} className="mt-3 ">
                                 <input className="form-input-checkbox" type="checkbox"
                                    onChange={(e) => handleChangeAddress(e, adr)}
                                    name="address" checked={adr.id === currentAddress.id} />
                                 <span>{adr.province + " " + adr.district + " " + adr.wards}</span>
                              </div>
                           })}
                        </div>
                        <br className="line" />
                        <div className="custome-checkbox mb-50 mt-20 d-flex ">
                           <div onClick={() => setCardMethod(false)}>
                              <input className="form-check-input" checked={!cardMethod} type="checkbox" readOnly name="CashPayment" />
                              <label className="form-check-label" ><span>Cash Payment</span></label>
                           </div>
                           <br />
                           <div className="ml-50" onClick={() => setCardMethod(true)}>
                              <input className="form-check-input" checked={cardMethod} type="checkbox" readOnly name="CardPayment" />
                              <label className="form-check-label"><span>Credit Card Payment</span></label>
                           </div>
                        </div>
                        {cardMethod || sdkLoading ? (
                           <div className="paypal">
                              <PayPalButton
                                 amount={totalCartAfterDiscount}
                                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                 onSuccess={(_details: any, data: any) => {
                                    if (!currentAddress) {
                                       toast.info("Please choose current address!")
                                       return;
                                    }
                                    dispatch(cashOrderByPaypal({ COD: false, payment_id: data.orderID, address: currentAddress })).then(() => {
                                       setTimeout(() => {
                                          dispatch(getCart())
                                       }, 300);
                                    })
                                 }}
                                 onError={() => {
                                    alert("Transaction error");
                                 }}
                              />
                           </div>) :
                           <button type="button" onClick={handleCheckOut} className="btn mb-20 w-100">Proceed To CheckOut<i className="fi-rs-sign-out ml-15"></i></button>
                        }

                     </div>
                  </div>
               </div>
            </div>
         </main>
      </>
   )
}
