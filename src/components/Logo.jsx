/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import logo from "../assets/images/logo.png" 
const Logo = ({width="100%", height="100%"}) => {
  return (
    <img src={logo} style={{width, height}} alt="Logo Placeholder" className="object-cover"/>
  )
}

export default Logo
