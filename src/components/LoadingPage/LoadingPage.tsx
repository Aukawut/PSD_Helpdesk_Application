import { CircularProgress } from '@mui/material'
import React from 'react'

const LoadingPage:React.FC = () => {
  return (
    <div><CircularProgress disableShrink /></div>
  )
}

export default LoadingPage