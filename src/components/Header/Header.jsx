import Container from "../container/Container"
import Logo from "../Logo"
import { Link } from "react-router-dom"
import LogoutBtn from './LogoutBtn'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
          }, 
          {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
  return (
    <header className="flex items-center bg-white shadow-2xl">
        <Container>
            <nav className="flex items-center py-2">
                <div className="mr-4 max-sm:mr-3">
                    <Link to="/">
                        <Logo height="70%" width="70%"/>
                    </Link>
                </div>
                <ul className="flex ml-auto flex-wrap max-sm:flex-nowrap max-sm:text-xs font-semibold">
                    {/* display navs based on active status, and navigate accordingly */}
                    {
                        navItems.map((item) => (
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                    onClick={() => navigate(item.slug)}
                                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        ))
                    }
                    {/* only display logout when user is logged in */}
                    {
                        authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )
                    }
                </ul>
            </nav>
        </Container>
    </header>
  )
}

export default Header
