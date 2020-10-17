import React from 'react'

export default function AddressCard(props:any) {
    return (
        <div className={"address-card" + (props.data.isdefault?" default-address":"") } >
            <h6>
                {`
                    ${props.data.lineone}, 
                    ${props.data.locality}
                `}
            </h6>
            <h6>{`${props.data.city}, ${props.data.district}`}</h6>
            <h6>{`${props.data.state}, ${props.data.country}, ${props.data.pincode}`}</h6>
        </div>
    )
}
