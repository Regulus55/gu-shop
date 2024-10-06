import React from 'react';
import {useLocation} from "react-router-dom";

const Footer = () => {
    const location = useLocation()

    return (
        <footer
            className={`mt-auto border-t border-gray-200`}
        >
            footer<div className={'bg-black w-8 h-8  pt-10'}>ddddd</div>
        </footer>
    );
};

export default Footer;