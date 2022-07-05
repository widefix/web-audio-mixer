import React, { useContext } from 'react'
import { UserInputEvent, MixerChanges } from "../containers"

interface MxContextInterface {
  mx: any
  isReady: boolean
  mixerChanges: MixerChanges
  onUserInput: (event: UserInputEvent) => void
}

export const MxContext = React.createContext<MxContextInterface>({
  mx: null,
  isReady: false,
  mixerChanges: null,
  onUserInput: (event: UserInputEvent) => {event}
})

export const MxContextProvider: React.FC<MxContextInterface> = ({
    mx,
    isReady,
    mixerChanges,
    onUserInput,
    children
  }) => {
  return (
    <MxContext.Provider
      value={{
        mx,
        isReady,
        mixerChanges,
        onUserInput
      }}
    >
  {children}
  </MxContext.Provider>
  )
}

const useMxContext = (): MxContextInterface => {
  return useContext(MxContext)
}

export { useMxContext }
