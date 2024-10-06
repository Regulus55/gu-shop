import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate()
    const userData = null;
    const isAdmin = true; //관리자
    const loading = false;
    const [open, setOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const logout = () => {}
    const onMouseEnter = () => {}
    const onMouseLeave = () => {}

    return (
        <header>
            navbar
        </header>
    );
};

export default Navbar;