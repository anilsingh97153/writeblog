import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header"
import Footer from "./components/footer/Footer"
import './index.css';
import { Outlet } from "react-router-dom";

const App = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // when the app laods, check whether the user is logged in or not.
    useEffect(() => {
        // check for current user
        authService.getCurrentUser().then((userData) => {
            // if found, dispatch the userData to store
            if(userData) {
                dispatch(login({userData}));
            } else {
                // if userData is not received, just update the state, to make sure that if not logged in, that means logout
                dispatch(logout());
            }
        })
        .catch((error) => {
            console.log(`Error :: getCurrentUser :: ${error}`);
        })
        .finally(() => setLoading(false));
    }, [])

  // output based on page loading status  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-white'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App