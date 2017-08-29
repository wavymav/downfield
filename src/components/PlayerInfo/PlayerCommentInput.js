import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { createComment } from '../../mutations'
import { fetchPlayer , fetchPlayers } from '../../queries'

const PlayerCommentInput = ({ mutate, playerId }) => {
  let input

  const _handleOnSubmit = (event) => {
    event.preventDefault()

    mutate({
      variables: {
        content: input.value,
        playerId
      },
      refetchQueries: [{
        query: fetchPlayers
      }, {
        query: fetchPlayer,
        variables: {
          playerId
        }
      }]
    })
    .then(() => input.value = '')
  }

  return (
    <form onSubmit={ _handleOnSubmit }>
      <input
        ref={ (value) => input = value }
        className='m-player-comment-input'
        placeholder='Write a comment...'
      />
    </form>
  )
}

const { func, string } = PropTypes
PlayerCommentInput.propTypes = {
  mutate: func,
  playerId: string
}

export default graphql(createComment)(PlayerCommentInput)
