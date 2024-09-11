import { PayPalButtons } from "@paypal/react-paypal-js"
import React from "react"
import { getPayPalCompleted, getPayPalCompletedPremium } from "../../stateManagement/actions/getTrasactions"
import { useDispatch } from "react-redux"

const PayPalButtonPremium = (props)=>{

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
                    dispatch(getPayPalCompletedPremium(true))
                }
            }}
            onError={async (data, actions) =>{
                console.log("error");
            }}
        />
    )
}
export default PayPalButtonPremium;