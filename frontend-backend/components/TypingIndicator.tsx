import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

const TypingIndicator = () => {
  const [dots, setDots] = React.useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''))
    }, 500) 

    return () => clearInterval(interval)
  }, [])

  return (
    <Text>
      {`Typing${dots}`}
    </Text>
  )
}

export default TypingIndicator
