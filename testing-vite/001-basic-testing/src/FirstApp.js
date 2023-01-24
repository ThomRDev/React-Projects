import React from 'react'
import PropTypes from "prop-types"

export const FirstApp = ({ title,subtitle }) => {
  return (
    <>
      <h1 data-testid='test-title'>{ title }</h1>
      <h2>{ subtitle }</h2>
      <p>Mensaje</p>
      <p>Mensaje</p>
      <p>Mensaje</p>
    </>
  )
}

FirstApp.propTypes = {
  title:PropTypes.string.isRequired,
  subtitle:PropTypes.string,
}
FirstApp.defaultProps = {
  // title : "I'm a title",
  subtitle : "I'm a subtitle",
}