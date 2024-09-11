import { PayPalButtons } from "@paypal/react-paypal-js"
import React from "react"
import { getPayPalCompleted } from "../../stateManagement/actions/getTrasactions"
import { useDispatch } from "react-redux"

const PayPalButton = (props)=>{

    const dispatch = useDispatch()

    return(
        <PayPalButtons 
            // createOrder={(data, actions)=>{
            createOrder={(_, actions)=>{
                return actions.order.create({
                    purchase_units:[
                        {
                            description:props.invoice,
                            amount:{
                                value:props.totalValue,
                            }
                        }
                    ]
                })
            }}
            onApprove={async (data, actions)=>{
                const order = await actions.order?.capture()
                if(order.status ==="COMPLETED"){
                    dispatch(getPayPalCompleted(true))
                }
            }}
            onError={async (data, actions) =>{
                console.log("error");
            }}
        />
    )
}
export default PayPalButton;