import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import { LoadingSpinner } from '../LoadingSpinner'
import PlayerCommentInput from './PlayerCommentInput'
import { fetchPlayer } from '../../queries'


export const PlayerInfo = ({
  data: {
    loading,
    player
  }
}) => {
  if (loading) {
    return <LoadingSpinner />
  }

  const renderComments = () => (
    comments.map(({ content, id}) => (
      <div
        key={ id }
        className='m-player-info__comment-content'
      >
        <div className='m-player-info__comment-text'>
          { content }
        </div>
      </div>
    ))
  )

  const {
    id,
    firstName,
    lastName,
    position,
    jerseyNumber,
    team,
    comments
  } = player

  return (
    <div className='m-player-info'>
      <h2 className='m-page-title'>NFL Player</h2>
      <Link
        className='m-player-list-item__button  m-player-info__back'
        to={ '/' }
      >
        Back
      </Link>
      <div className='m-player-info__content'>
        {/* BEING VERY LAZY HERE :P */}
        <div className='m-player-list-item__section'>
          <p className='m-player-list-item__text  m-player-list-item__text_name'>{ `${ firstName } ${ lastName }`}</p>
          <p className='m-player-list-item__text'>{ `#${ jerseyNumber }` }</p>
          <p className='m-player-list-item__text'>{ position }</p>
        </div>
        <div className='m-player-list-item__section'>
          <p className='m-player-list-item__text  m-player-list-item__text_team'>{ team }</p>
        </div>
      </div>
      <div className='m-player-info__comment'>
        { renderComments() }
      </div>
      <div className='m-player-info__input'>
        <PlayerCommentInput playerId={ id } />
      </div>
    </div>
  )
}

const { shape, bool, object } = PropTypes
PlayerInfo.propTypes = {
  params: object,
  data: shape({
    loading: bool,
    player: object
  }).isRequired
}

export default graphql(fetchPlayer, {
  options: (props) => ({
    variables: { playerId: props.params.id }
  })
})(PlayerInfo)
