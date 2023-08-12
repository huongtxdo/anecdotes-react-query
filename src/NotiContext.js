import { useReducer, createContext, useContext } from 'react'

const notiReducer = (state, action) => {
  switch (action.type) {
    case 'vote':
      return `anecdote '${action.payload}' voted`
    case 'create':
      return `anecdote '${action.payload}' created`
    case 'error':
      return `${action.payload}`
    case 'reset':
      return ''
    default:
      return state
  }
}

const NotiContext = createContext()

export const useMessageValue = () => {
  const valueAndDispatch = useContext(NotiContext)
  return valueAndDispatch[0]
}

export const useMessageDispatch = () => {
  const valueAndDispatch = useContext(NotiContext)
  return valueAndDispatch[1]
}

export const NotiContextProvider = (props) => {
  const [notiMessage, notiMessageDispatch] = useReducer(notiReducer, '')

  return (
    <NotiContext.Provider value={[notiMessage, notiMessageDispatch]}>
      {props.children}
    </NotiContext.Provider>
  )
}

export default NotiContext
