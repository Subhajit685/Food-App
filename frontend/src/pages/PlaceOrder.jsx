import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { storeContext } from '../context/Storecontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-hot-toast"

function PlaceOrder() {

  const navigate = useNavigate()
  const { gettotalamount, food_list, url, count, } = useContext(storeContext)

  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const hendleChenge = (e) => {
    const name = e.target.name
    const value = e.target.value
    setdata(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    // let orderitems = []
    // food_list.map((item) => {
    //   if (count[item._id] > 0) {
    //     let iteminfo = item
    //     iteminfo["Quantity"] = count[item._id]
    //     orderitems.push(iteminfo)
    //   }
    // })
    // const orderDetiles = {
    //   items: orderitems,
    //   amount: gettotalamount() + 5,
    //   address: data,
    // }

    // const res = await axios.post(`${url}/api/order/order`, orderDetiles, { withCredentials: true })
    // toast.success("Order delivered")
    // navigate("/myorder")

    const res = await axios.post(`${url}/api/payment/order`, { amount: gettotalamount() + 5 }, { withCredentials: true })

    var options = {
      key: res.data.key, // Enter the Key ID generated from the Dashboard
      amount: gettotalamount() + 5, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Foodie",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${url}/api/payment/paymentVerification`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000"
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      },
      method: {
        upi: true, // Enable UPI
        card: true,
        netbanking: true,
        wallet: true
    }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }



  return (
    <div>
      <Navbar />
      <form onSubmit={placeOrder}>
        <div className='flex 2xl:justify-around xl:justify-around lg:justify-around md:justify-around sm:justify-around 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col my-28'>

          <div className='2xl:w-96 xl:w-96 md:w-80 sm:w-60 w-72 sm:mx-auto mx-auto mt-8'>

            <h1 className='text-2xl font-bold my-10'>Delivary Information</h1>
            <div className='flex w-full'>
              <input required onChange={hendleChenge} value={data.firstname} name='firstname' type="text" placeholder='First name' className='border border-black rounded-sm px-2 py-1 w-full my-3' />
              <input required onChange={hendleChenge} value={data.lastname} name='lastname' type="text" placeholder='last name' className='border border-black rounded-sm px-2 py-1 w-full my-3 mx-1' />
            </div>
            <div className='w-full'>
              <input required onChange={hendleChenge} value={data.email} name='email' type="email" placeholder='Email address' className='border border-black rounded-sm px-2 py-1 w-full my-3' />
            </div>
            <div className='w-full'>
              <input required onChange={hendleChenge} value={data.street} name='street' type="text" placeholder='Street' className='border border-black rounded-sm px-2 py-1 w-full my-3' />
            </div>
            <div className='flex w-full'>
              <input required onChange={hendleChenge} value={data.city} name='city' type="text" placeholder='City' className='border border-black rounded-sm px-2 py-1 w-full my-3' />
              <input required onChange={hendleChenge} value={data.state} name='state' type="text" placeholder='State' className='border border-black rounded-sm px-2 py-1 w-full my-3 mx-1' />
            </div>
            <div className='flex w-full'>
              <input required onChange={hendleChenge} value={data.zipcode} name='zipcode' type="text" placeholder='Zip code' className='border border-black rounded-sm px-2 py-1 w-full my-3' />
              <input required onChange={hendleChenge} value={data.country} name='country' type="text" placeholder='Country' className='border border-black rounded-sm px-2 py-1 w-full my-3 mx-1' />
            </div>
            <div className='w-full'>
              <input required onChange={hendleChenge} value={data.phone} name='phone' type="text" placeholder='Phone' className='border border-black rounded-sm px-2 py-1 w-full my-3' />
            </div>

          </div>


          <div className='2xl:w-96 xl:w-96 md:w-80 sm:w-60 w-72 sm:mx-auto mx-auto mt-8'>
            <h1 className='text-2xl font-bold my-10'>Cart Totals</h1>
            <div className='flex justify-between'>
              <p className='text-sm mt-4'>Subtotal</p>
              <p className='text-sm mt-4'>${gettotalamount()}</p>
            </div>
            <div className='bg-gray-300 h-0.5 w-full sm:mx-auto my-1' />
            <div className='flex justify-between'>
              <p className='text-sm mt-4'>Delivery Free</p>
              <p className='text-sm mt-4'>{gettotalamount() > 0 ? "$5" : "$0"}</p>
            </div>
            <div className='bg-gray-300 h-0.5 w-full sm:mx-auto my-1' />
            <div className='flex justify-between'>
              <p className='text-sm font-bold mt-4'>Total</p>
              <p className='text-sm mt-4'>${gettotalamount() > 0 ? gettotalamount() + 5 : gettotalamount()}</p>
            </div>
            <button className='bg-red-500 text-white sm:p-2 p-1 my-2 rounded-sm'>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
