import { useEffect, useState } from "react";
import Image from "../assets/backgroundImage.jpg"
import { motion, AnimatePresence } from "motion/react";

function NotFound() {

    const [firstContVisible, showFirstCont] = useState(true)
    const [secContVisible, showSecCont] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            showFirstCont(false)
        }, 4000)
        const timer2 = setTimeout(() => {
            showSecCont(true)
        }, 6000)
    }, [])

    return (
        <div className="NotFoundContainer">
            <AnimatePresence>
                {firstContVisible && 
                    <motion.div className="firstpage"
                        initial={{x: 0, scale: 1, opacity: 1    }}
                        animate={{x: 0, scale: 1, opacity: 1}}
                        exit={{x: 0, opacity: 0, scale: 0, rotate: -360}}
                        transition={{duration: 2}}
                    >
                        <motion.h1 className="NotFoundTitle"
                            initial={{y: -500}}
                            animate={{y: 0}}
                            transition={{duration: 1}}
                        >Упсс...</motion.h1>
                        <motion.h1 className="NotFoundTitle"
                            initial={{x: -5000}}
                            animate={{x: 0}}
                            transition={{duration: 2}}
                        >Походу тут ничего нет</motion.h1>
                        <motion.h1 className="NotFoundTitle"
                            initial={{x: 10000}}
                            animate={{x: 0}}
                            transition={{duration: 3}}
                        >Ну ты это...</motion.h1>
                        <motion.h1 className="NotFoundTitle"
                            initial={{y: 5000}}
                            animate={{y: 0}}
                            transition={{duration: 3.5}}
                        >Не грусти</motion.h1>
                    </motion.div>
                }
            </AnimatePresence>
            <AnimatePresence>
                {secContVisible && 
                    <motion.div className="secondpage"
                        initial={{scale: 0, opacity: 0, rotate: -360}}
                        animate={{scale: 1, opacity: 1, rotate: 0}}
                        transition={1}
                    >
                        <h1 className="NotFoundTitle">Держи мемчик</h1>
                        <img src={Image} className="NotFoundBackgroundImage"/>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default NotFound;

// initial={{x:0, rotate: -360, scale: 0.1, opacity: 0}}
// animate={{x: 0, rotate: 0, scale: 1, opacity: 1}}