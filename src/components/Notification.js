import { useMessageValue } from '../NotiContext'

const Notification = () => {
  const errorMessage = useMessageValue()
  const message = useMessageValue()
  const style =
    errorMessage === ''
      ? null
      : {
          border: 'solid',
          padding: 10,
          borderWidth: 1,
          marginBottom: 5,
        }

  return <div style={style}>{message}</div>
}

export default Notification
