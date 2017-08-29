import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

export const PlayerListItem = ({
  id,
  firstName,
  lastName,
  jerseyNumber,
  position,
  team,
  commentsCount
}) => {
  const renderCommentsButton = () => {
    if (!commentsCount) {
      return (
        <div className='m-player-list-item__button  is-disabled'>
          No Comments
        </div>
      )
    }

    return (
      <Link
        to={ `/players/${ id }` }
        className='m-player-list-item__button  m-player-list-item__button_comment'
      >
        { `(${ commentsCount }) ${ commentsCount > 1 ? 'comments' : 'comment' }` }
      </Link>
    )
  }

  return (
    <div className='m-player-list-item'>
      <div className='m-player-list-item__inner'>
        <div className='m-player-list-item__section'>
          <p className='m-player-list-item__text  m-player-list-item__text_name'>{ `${ firstName } ${ lastName }`}</p>
          <p className='m-player-list-item__text'>{ `#${ jerseyNumber }` }</p>
          <p className='m-player-list-item__text'>{ position }</p>
        </div>
        <div className='m-player-list-item__section'>
          <p className='m-player-list-item__text  m-player-list-item__text_team'>{ team }</p>
        </div>
        <div className='m-player-list-item__actions'>
          { renderCommentsButton() }
          <div className='m-player-list-item__buttons'>
            {/* <div className='m-player-list-item__button'>
              Edit
            </div> */}
            <div className='m-player-list-item__button m-player-list-item__button_edit'>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const { string, number} = PropTypes
PlayerListItem.propTypes = {
  id: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  jerseyNumber: number.isRequired,
  position: string.isRequired,
  team: string.isRequired,
  commentsCount: number.isRequired
}
