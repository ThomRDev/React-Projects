import PropTypes from 'prop-types'

const FirstComponent = ({ title,subtitle }) => {
    return (
        <>
            <h1>{ title }</h1>
            <h2> { subtitle } </h2>
        </>
    )
}

FirstComponent.propTypes = {
    title: PropTypes.string.isRequired
}
FirstComponent.defaultProps = {
    subtitle : "I'm a subtitle"
}

export default FirstComponent