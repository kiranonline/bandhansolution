import React from 'react'
import "./ChangePassword.css"

function ChangePassword() {
    return (
        <div className="changepassword">
            <div className="changepassword-inner">
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text changepassword-span" id="inputGroup-sizing-sm">New Password</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm" />
                </div>
                <br/>
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text changepassword-span" id="inputGroup-sizing-sm">Confirm New Password</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm" />
                </div>
                <button type="button" class="btn btn-success changepassword-btn">Change Password</button>
            </div>
        </div>
    )
}

export default ChangePassword
