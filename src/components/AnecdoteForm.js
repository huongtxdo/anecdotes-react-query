import { useMutation, useQueryClient } from 'react-query'

import { createAnecdote } from '../requests'
import { useMessageDispatch } from '../NotiContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useMessageDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      dispatch({
        type: 'error',
        payload: 'Unable to create anecdote',
      })
      setTimeout(() => {
        dispatch({ type: 'reset' })
      }, 5000)
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.length < 5) {
      dispatch({
        type: 'error',
        payload: 'too short anecdote, must have length 5 or more',
      })
      setTimeout(() => {
        dispatch({ type: 'reset' })
      }, 5000)
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      dispatch({ type: 'create', payload: content })
      setTimeout(() => {
        dispatch({ type: 'reset' })
      }, 5000)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
