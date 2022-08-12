import React, { useEffect } from 'react'

const Alert = ({type, message, removeAlert}) => {
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            removeAlert()
        },3000)
        return()=>  clearTimeout(timeout)
    }, [])
  return (
    <div className={`alert alert-${type}`}>{message}</div>
  )
}

export default Alert