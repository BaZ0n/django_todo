import React, { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import { AnimatePresence, motion } from "motion/react"

function AlertMessage({type, errorText, onClose}) {

    const [alertVisible, setVisible] = useState(true)

    useEffect(() => {
        if (alertVisible) {
            const timer = setTimeout(() => {
                setVisible(false)
                onClose()
            }, 3000)

            return() => clearTimeout()
        }
    }, [alertVisible])

    return (
        <AnimatePresence>
            {alertVisible &&
                <motion.div
                    className="Alert-container"
                    initial={{opacity: 0.3, x: 100}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0.2, x: 100}}
                    transition={{duration: 0.2}}
                >
                    <Alert 
                        className="alert" 
                        variant={type}
                        > 
                            {errorText}
                    </Alert>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default AlertMessage