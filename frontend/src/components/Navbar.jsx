import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function Navbar() {

    const [activeElement, setActive] = useState(0)

    const handleClicked = (value) => {
        setActive(value)
    } 

    return (
        <div className="navbar_container">
            <div className={activeElement == 0 ? "navbar_element active_element" : "navbar_element"} onClick={() => handleClicked(0)}>
                <p>Задачи</p>
            </div>
            <div className={activeElement == 1 ? "navbar_element active_element" : "navbar_element"} onClick={() => handleClicked(1)}>
                <p>Друзьяшки</p>
            </div>
            <div className={activeElement == 2 ? "navbar_element active_element" : "navbar_element"} onClick={() => handleClicked(2)}>
                <p>Хезик</p>
            </div>
{/*             
            <motion.div 
                className="underline"
                layoutId="underline"
               />    */}
        </div>
    )

}

export default Navbar