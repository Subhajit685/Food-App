import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { storeContext } from '../context/Storecontext'
import toast from 'react-hot-toast'

function ConfiremOrder() {
    const { gettotalamount, food_list, url, count } = useContext(storeContext)
    const parem = useParams()
    console.log(parem)

    useEffect(() => {
        const order = async () => {
            let orderitems = []
            food_list.map((item) => {
              if (count[item._id] > 0) {
                let iteminfo = item
                iteminfo["Quantity"] = count[item._id]
                orderitems.push(iteminfo)
              }
            })
            const orderDetiles = {
              items: orderitems,
              amount: gettotalamount() + 5,
              address: data,
            }

            const res = await axios.post(`${url}/api/order/order`, orderDetiles, { withCredentials: true })
            toast.success("Order confirem")
        }
        if(food_list.length > 0){
            order()
        }
    }, [])
    return (
        <div>
            Order Confirem
        </div>
    )
}

export default ConfiremOrder
