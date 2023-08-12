import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getAnecdotes, incrementVotes } from '../requests'
import { useMessageDispatch } from '../NotiContext'

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const dispatch = useMessageDispatch()
  ///////// VOTE /////////
  const handleVoteMutatation = useMutation(incrementVotes, {
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData(
        'anecdotes',
        anecdotes.map((anecdote) =>
          anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote
        )
      )
    },
  })

  const handleVote = async (anecdote) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    handleVoteMutatation.mutate(votedAnecdote)
    dispatch({ type: 'vote', payload: votedAnecdote.content })
    setTimeout(() => {
      dispatch({ type: 'reset' })
    }, 5000)
  }

  ///////// LOADING DATA //////////

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
