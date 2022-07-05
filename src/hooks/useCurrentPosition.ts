import {
  useRef,
  DependencyList,
  useLayoutEffect
} from 'react'

interface IPosition {
  x: number
  y: number
}

interface IScrollProps {
  prevPos: IPosition
  currPos: IPosition
}

const isBrowser = typeof window !== `undefined`
const zeroPosition = { x: 0, y: 0 }

const getScrollPosition = () => {
  if (!isBrowser) {
    return zeroPosition
  }

    return { x: window.scrollX, y: window.scrollY }
}

export const useScrollPosition = (
  effect: (props: IScrollProps) => void,
  deps?: DependencyList,
  wait?: number
): void => {
  const position = useRef(getScrollPosition())

  let throttleTimeout: number | null = null

  const callBack = () => {
    const currPos = getScrollPosition()
    effect({ prevPos: position.current, currPos })
    position.current = currPos
    throttleTimeout = null
  }

  useLayoutEffect(() => {
    if (!isBrowser) {
      return undefined
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = window.setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (throttleTimeout) {
        clearTimeout(throttleTimeout)
      }
    }
  }, deps)
}

useScrollPosition.defaultProps = {
  deps: [],
  element: false,
  useWindow: false,
  wait: null,
  boundingElement: false
}
