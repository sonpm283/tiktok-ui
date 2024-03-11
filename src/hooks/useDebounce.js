import { useEffect, useState } from 'react'

function useDebounce(searchTerm, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm, delay])

  return [debouncedValue]
}

export default useDebounce
