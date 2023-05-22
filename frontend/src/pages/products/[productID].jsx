import { useRouter } from 'next/router'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { getOneProduct } from '../api/product'
import { Select } from 'antd'

const ProductView = () => {

   const router = useRouter()

   // From database
   const [product, setProduct] = useState(null)

   // local states
   const [purchaseQuantity, setPurchaseQuantity] = useState(1)
   const [location, setLocation] = useState('USA')
   const [deliverCharge, setDeliverCharge] = useState(0)
   const [price, setPrice] = useState(0)
   const [optionSelect, setOptionSelect] = useState(0)
   const [orderDate, setorderDate] = useState(new Date(Date.now()).toISOString())
   const [deliveryDate, setDeliveryDate] = useState(new Date(Date.now()+ (3*24*3600*1000)).toISOString())

   const [paymentView, setPaymentView] = useState("none")
   const [paymentWay, setPaymentWay] = useState("")

   const [bkash, setBkash] = useState({ "number": "", "amount": "", "pin": "" })
   const [card, setCard] = useState({ "type": "", "number": "", "amount": "", "pin": "" })

   const [purchaseForm, setPurchaseForm] = useState(null)

   useEffect(() => {
      async function getProduct() {
         let ProductID = router.query.productID
         console.log("this is product id", ProductID);
         let data = await getOneProduct(ProductID)
         setProduct(data[0])

      }
      getProduct()

   }, [router.isReady])

   useEffect(() => {
      if (product != null) {
         if (product.discount != 0) {
            setPrice(product.discount)
         } else {
            setPrice(product.price)
         }
      }

      if (location != "dhaka") {
         setDeliverCharge(75)
      } else {
         if ((price) < 500) {
            setDeliverCharge(20)
         }
      }

   }, [product])

   const imgToBase64 = () => {
      let base64 = btoa(String.fromCharCode(...new Uint8Array(product.image.data.data)))
      return base64
   }

   const onQuantityHandler = (flag) => {
      if (flag == 0 && purchaseQuantity > 1) {
         setPurchaseQuantity(purchaseQuantity - 1)
      } else if (flag == 1 && purchaseQuantity < product.instock) {
         setPurchaseQuantity(purchaseQuantity + 1)
      }
   }

   const onPurchaseHandler = (flag) => {
      let values
      if(flag == 0){
         values = Object.values(bkash);
         let acc_number = /^[0-9]+$/.test(values[0]);
         let amount = /^([0-9]+[.])?[0-9]+$/.test(values[1]);
         let pin = /^[0-9]+$/.test(values[2]);

         if(acc_number && amount && pin){
            let bills = {
               ProductID: product.ProductID,
               OrderID: "order1",
               UserID: "user1",
               name: product.name,
               price: price,
               quantity: purchaseQuantity,
               deliveryCharge: deliverCharge,
               totalPrice: (price*purchaseQuantity)+deliverCharge,
               option: product.options[optionSelect],
               orderDate: orderDate,
               deliverDate: deliveryDate,
               paymentWay: "bkash",
               paymentNumber: bkash["number"],
               paymentAmout: bkash["amount"],
            }

            console.log(bills);
         }
         console.log(acc_number, amount, pin, values);
      }else if(flag == 1){

      }
   }

   const RightView = () => (
      <>
         <span className='text-xl font-semibold'>
            &#2547;{price}

         </span>

         <li className='text-sm font-bold'>
            Delivery Charge: &#2547; {deliverCharge} (location: {location})
         </li>

         <li className='text-sm'>Delivered by: {orderDate}</li>

         <span className='text-lg font-semibold'>
            Total price: &#2547;{(price * purchaseQuantity) + deliverCharge}
         </span>

         <button className='py-2 flexRowCenter w-full bg-blue-500 rounded-xl'>Add to cart</button>

         <button
            className='py-2 flexRowCenter w-full bg-first rounded-xl'
            onClick={() => {
               if (paymentView == "none") {
                  setPaymentView("flex")
               } else {
                  setPaymentView("none")
               }
            }}
         >
            Buy Now
         </button>

         {/* Buy Now View */}
         <div className='flexColCenter w-full gap-2'
            style={{
               display: paymentView
            }}
         >
            <span>How do you wanna Pay?</span>
            <span className='w-full flexRowCenter justify-between'>
               <button
                  className='w-24 h-10 flexRowCenter hover:text-white rounded-md border-2 border-pink-500 hover:bg-pink-500'
                  style={{
                     backgroundColor: (paymentWay == 'bkash') ? "rgb(236, 72, 153 )" : "",
                     color: (paymentWay == 'bkash') ? "white" : "",
                  }}
                  onClick={() => {
                     if (paymentWay != "bkash") {
                        setPaymentWay('bkash')
                     } else {
                        setPaymentWay('')
                     }
                  }}
               >
                  Bkash
               </button>

               <button
                  className='w-24 h-10 flexRowCenter hover:text-white rounded-md border-2 border-orange-500 hover:bg-orange-500'
                  style={{
                     backgroundColor: (paymentWay == 'card') ? "rgb(249, 115, 22 )" : "",
                     color: (paymentWay == 'card') ? "white" : "",
                  }}
                  onClick={() => {
                     if (paymentWay != "card") {
                        setPaymentWay('card')
                     } else {
                        setPaymentWay('')
                     }
                  }}
               >
                  Card
               </button>

            </span>

            {/* Bkash Info */}
            <div className='w-full flexColCenter gap-3'
               style={{ display: (paymentWay == "bkash" ? "flex" : "none") }}
            >

               <input className='px-2 w-full h-10 rounded-lg focus:border-none border-2 border-pink-500' placeholder='Bkash acc. number'
                  value={bkash['number']}
                  onChange={e => setBkash({ ...bkash, "number": e.target.value })}
               />
               <input className='px-2 w-full h-10 rounded-lg focus:border-none border-2 border-pink-500' placeholder='Amount'
                  value={bkash['amount']}
                  onChange={e => setBkash({ ...bkash, "amount": e.target.value })}
               />
               <input className='px-2 w-full h-10 rounded-lg focus:border-none border-2 border-pink-500' placeholder='Bkash pin'
                  value={bkash['pin']}
                  onChange={e => setBkash({ ...bkash, "pin": e.target.value })}
               />
               <button
                  className='w-full h-10 text-lg font-semibold bg-blue-500 text-white rounded-xl'
                  onClick={() => { onPurchaseHandler(0) }}
               >
                  Bkash Pay
               </button>
            </div>

            {/* Card Info */}
            <div className='w-full flexColCenter gap-3'
               style={{ display: (paymentWay == "card" ? "flex" : "none") }}
            >
               <Select
                  className='flex w-full'
                  defaultValue={"Select a type of card"}
                  onChange={(value) => { setCard({ ...card, type: value }) }}
                  options={[
                     { label: <span className='flexRowCenter justify-start gap-2'><img src='/mastercard.png' className='w-7 h-5' alt='MasterCard' /> <span>Mastercard</span></span>, value: "Mastercard" },
                     { label: <span className='flexRowCenter justify-start gap-2'><img src='/visa.png' className='w-8 h-6' alt='Visa' /> <span>VISA</span></span>, value: "Visa" },
                     { label: <span className='flexRowCenter justify-start gap-2'><img src='/americanexpress.png' className='w-8 h-6' alt='American Express' /> <span>American Express</span></span>, value: "American Express" },
                  ]}
               />

               <input className='px-2 w-full h-10 rounded-lg focus:border-none border-2 border-orange-500' placeholder='Card number'
                  value={card['number']}
                  onChange={e => setCard({ ...card, "number": e.target.value })}
               />
               <input className='px-2 w-full h-10 rounded-lg focus:border-none border-2 border-orange-500' placeholder='Amount'
                  value={card['amount']}
                  onChange={e => setCard({ ...card, "amount": e.target.value })}
               />
               <input className='px-2 w-full h-10 rounded-lg focus:border-none border-2 border-orange-500' placeholder='Pin'
                  value={card['pin']}
                  onChange={e => setCard({ ...card, "pin": e.target.value })}
               />

               <button
                  className='w-full h-10 text-lg font-semibold bg-blue-500 text-white rounded-xl'
                  onClick={() => { onPurchaseHandler(1) }}
               >
                  Purchase
               </button>

            </div>


         </div>
      </>
   )

   return (
      product != null
         ?
         // <ShowView />
         <div className='w-full px-10 flex flex-col'>
            <span className='w-2/3 my-4 text-2xl font-semibold bg-red-500'>{product.name}</span>

            <div className='flex flex-col md:flex-row'>
               <img alt='product image' src={"data:image/png;base64," + imgToBase64()}
                  className='flex w-80 h-100 bg-red-600'
               />
               <span className='px-6 flex w-full border-0 border-blue-400'>

                  <div className='lg:mr-14 flex flex-col divide-y-2 divide-third/60'>

                     {/* Price block */}
                     <div className='py-2 w-full flex flex-col gap-2'>

                        <span className=' flex flex-row gap-2'>
                           <span className=' text-2xl'>Price: </span>
                           {
                              product.discount == 0
                                 ?
                                 <span className='text-2xl font-semibold'>&#2547;{product.price}</span>
                                 :
                                 <>
                                    <span className='text-2xl font-semibold'>&#2547;{product.discount}</span>
                                    <span className='text-lg font-medium line-through text-slate-400'>{product.price}</span>

                                 </>


                           }

                           <div className='flex flex-row text-end text-orange-400'>
                              {
                                 [...Array(product.rating)].map((value, index) => (
                                    <span key={index}>&#9733;</span>
                                 ))
                              }
                              <span className='mx-1 '>({product.sold})</span>

                           </div>


                        </span>

                        <span className='ml-5 flex flex-col font-semibold'>
                           <li>Delivery fee within Dhaka is free for any purchase greater than 500tk.</li>
                           <li>Delivery Charge 16tk within Dhaka.</li>
                        </span>

                     </div>

                     {/* Stock block */}
                     <div className='py-2 flex flex-col gap-3'>

                        <div className='flex flex-col items-start gap-2'>

                           <div className='flexRowCenter gap-2'>
                              <span>Product in stock: </span>
                              <span className='p-2 border-2 rounded-md'>{product.instock}</span>
                           </div>

                           <div className='flex flex-row'>
                              <span className='text-lg'>Options: </span>
                              {
                                 product.options.map((value, index) => (
                                    <button key={index} 
                                       className='ml-5 px-3 flexRowCenter h-8 rounded-lg text-sm font-semibold border-2 border-blue-400 hover:bg-blue-400'
                                       style={{
                                          backgroundColor: optionSelect == index ? "rgb(96, 165, 250)" : "",
                                          color: optionSelect == index ? "white" : ""
                                       }}
                                       onClick={()=>{setOptionSelect(index)}}
                                    >
                                       {value}
                                    </button>
                                 ))
                              }
                           </div>


                        </div>


                        <div className='flexRowCenter justify-start gap-3'>
                           <span>Quantity:</span>
                           <button className=' pb-2 flexRowCenter w-8 h-8 text-2xl font-bold rounded-sm bg-first/70'
                              onClick={() => { onQuantityHandler(0) }}
                           >
                              &#8722;
                           </button>
                           <input className=' text-center w-10 h-10 text-lg font-semibold rounded-sm border-2 border-yellow-500/70'
                              value={purchaseQuantity}
                              onChange={(event) => { setPurchaseQuantity(event.target.value) }}

                           />
                           <button className='pb-2 flexRowCenter w-8 h-8 text-2xl font-bold rounded-sm bg-first/70'
                              onClick={() => { onQuantityHandler(1) }}
                           >
                              &#43;
                           </button>

                        </div>

                     </div>

                     {/* about block */}
                     <div>
                        <h1 className='font-bold'>About this product</h1>
                        {
                           product.description.map((value, index) => (
                              <li key={index} className='mx-5'>
                                 {value}
                              </li>
                           ))
                        }
                     </div>


                  </div>


                  {/* Buy now or add to cart */}
                  <div className='p-5 w-80 flex flex-col gap-2 border-2 border-green-500 overflow-hidden'>

                     {RightView()}

                  </div>




               </span>
            </div>
         </div>
         :
         <span>Hello</span>

   )

}

export default ProductView