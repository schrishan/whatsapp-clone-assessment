import React from "react";
import '../styles/error-alert.scss';
import Info from '../assets/images/info.svg';

interface Props {
    caption:string; 
}

const ErrorAlert = (props: Props) => {
    return (
        <div className="err-alert">
            <img src={Info} width='18' height='18' alt="error"  />
            <span className="err-caption">{props.caption}</span>
        </div>
    )
}
export default ErrorAlert;