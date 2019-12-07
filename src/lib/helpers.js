import {useEffect, useRef} from 'react'
import {DateTime} from 'luxon'

export const ssr = typeof window === `undefined`

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export const formatDate = isoDate => DateTime.fromISO(isoDate).toRelative().toString()

export const prettyPrintAmount = (amount, decimalPlaces=2, ticker='TRTL') => {
  if (isNaN(amount)) return 0
  // Get the amount we need to divide atomic units by X decimal places = 100
  const divisor = Math.pow(10, decimalPlaces)
  const dollars = amount >= 0 ? Math.floor(amount / divisor) : Math.ceil(amount / divisor)
  // Make sure 1 is displaced as 01
  const cents = Math.abs(amount % divisor)
    .toString()
    .padStart(decimalPlaces, '0')
  // Makes our numbers thousand separated.
  const formatted = dollars.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${formatted}.${cents} ${ticker}`
}