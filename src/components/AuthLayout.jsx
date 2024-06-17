/* eslint-disable react/prop-types */
// We will protect any of the files or pages from the front end by wrapping with this component.
// This will act as a protector

import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from 'react'
import loader from "../assets/images/loader.svg"


function Protected({children, authentication = true}) {

  const authStatus= useSelector(state => state.auth.status);
  const navigate = useNavigate(); 
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    // if authentication is required to load a page, and your authStatus if not equal to requirement, that means -- bro first login then come
    if(authentication && authStatus !== authentication) {
      navigate("/login");
    } else if(!authentication && authStatus !== authentication) {
      navigate("/")
    }

    setLoader(false);

  }, [authStatus, authentication, navigate])

  // TODO: create a spinner/widget insetad of null, for loader state
  return loader ? <img src={loader} alt="loader" className="w-20 h-20 object-contain"/> : <>{children}</>
}

export default Protected



