import React from 'react';
import "./WhatsappButton.css"

export default function WhatsappButton() {
    return (
        <a href="https://api.whatsapp.com/send?phone=+919563152391">
            <div className="whatsapp-button-wrapper">
                <img src={require("../../static/icons/whatsapp.svg")} />
            </div>
        </a>
    )
}
