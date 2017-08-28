import React from 'react'
import PropTypes from 'prop-types'

export const App = ({ children }) => (
  <div className='m-wrapper'>
    { children }
  </div>
)

const { object } = PropTypes
App.propTypes = {
  children: object.isRequired
}
