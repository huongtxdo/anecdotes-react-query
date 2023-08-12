import { useQuery, useMutation, useQueryClient } from 'react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, incrementVotes } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  ////////////////////////
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
  }
  ////////////////////////

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
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

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

export default App
