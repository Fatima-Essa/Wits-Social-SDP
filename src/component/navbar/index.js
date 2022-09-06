import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    //NavBtn,
    //NavBtnLink,
} from './NavbarElements';
//import {signOut} from "firebase/auth";
//import {auth} from "../../firebase";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to='/' activeStyle>
                        Profile
                    </NavLink>
                    <NavLink to='/Home' activeStyle>
                        Home
                    </NavLink>
                    <NavLink to='/annual' activeStyle>
                        Search
                    </NavLink>
                    <NavLink to='/team' activeStyle>
                        DM
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
