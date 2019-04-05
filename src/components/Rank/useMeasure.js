import { useState, useEffect } from 'react'

/**
 * React hook for getting width
 * @param  {Object} ref
 * @return {Number}
 */
function useMeasure (ref) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const { width } = window.getComputedStyle(ref.current)

    setWidth(parseFloat(width))
  }, [ref])

  return width
}

export default useMeasure
