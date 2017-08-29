import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { PlayerListItem } from './PlayerListItem'
import { LoadingSpinner } from '../LoadingSpinner'
import { fetchPlayers } from '../../queries'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const PlayerList = ({
  data: {
    loading,
    players
  }
}) => {
  const renderPlayerListItems = () => (
    players.map(({ id, ...rest }) =>
      <PlayerListItem
        key={ id }
        id={ id }
        { ...rest }
      />
    )
  )

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className='m-player-list'>
      <h2 className='m-page-title'>NFL Players</h2>
      <ReactCSSTransitionGroup
        transitionName='list-transition'
        transitionEnterTimeout={ 500 }
        transitionLeaveTimeout={ 300 }
      >
        { renderPlayerListItems() }
      </ReactCSSTransitionGroup>
      <div className='m-player-list__action'>
        <div className='m-player-list__button'>
          Create Player
        </div>
      </div>
    </div>
  )
}

const { string, number, bool, shape, arrayOf } = PropTypes
PlayerList.propTypes = {
  data: shape({
    players: arrayOf(
      shape({
        firstName: string,
        lastName: string,
        jerseyNumber: number,
        position: string,
        team: string
      }).isRequired
    ),
    loading: bool,
  }).isRequired,
}

export default graphql(fetchPlayers)(PlayerList)
