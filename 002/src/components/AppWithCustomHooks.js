
import PropTypes from "prop-types"
import useCounter from "../hooks/useCounter";
import logo from '../logo.svg';
import './../styles/App.css';

export const AppWithCustomHooks = ({ initialValue }) => {

    const { counter, actions } = useCounter(initialValue)

    const handleAction = event => {
        const { action } = event.target.dataset
        if (Object.hasOwn(actions, action)) {
            actions[action]()
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                {"renderizo custom" + (new Date().getTime())}
                <img src={logo} className="App-logo" alt="logo" />
                <div className="value">{counter}</div>
                <div className='actions'>
                    <button onClick={handleAction} data-action="increment">+1</button>
                    <button onClick={() => actions["reset"]()} >Reset</button>
                    <button onClick={handleAction} data-action="decrement">-1</button>
                </div>
            </header>
        </div>
    );
}

AppWithCustomHooks.propTypes = {
    initialValue: PropTypes.number
}
AppWithCustomHooks.defaultProps = {
    initialValue: 1
}