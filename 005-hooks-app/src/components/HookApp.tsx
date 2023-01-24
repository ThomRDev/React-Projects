import ContextCountriesComponent from "./01-useState/ContextCountries"
import CounterApp from "./01-useState/CounterApp"
import CounterAppWithCustomHook from "./01-useState/CounterAppWithCustomHook"
import Countries from "./01-useState/Countries"
import ThemeWithMemo from "./01-useState/ThemeWithMemo"
import ThemeWithoutMemo from "./01-useState/ThemeWithoutMemo"
import AppTittle from "./02-useEffect/AppTittle"
import Coordinates from "./02-useEffect/Coordinates"
import MouseOverWrapper from "./02-useEffect/MouseOver"
import PositionWrapper from "./02-useEffect/Position"
import QuotesApp from "./02-useEffect/Quotes"
import { Resize } from "./02-useEffect/Resize"
import SimpleForm from "./02-useEffect/SimpleForm"
import FocusScreen from "./03-useRef/FocusScreen"
import ToggleQuotes from "./03-useRef/ToggleQuotes"
import LayoutEffect from "./04-useLayoutEffect/LayoutEffect"
import Memorize from "./05-method-memo/Memorize"
import MethodMemo from "./05-method-memo/MethodMemo"
import Tarea1Memo from "./07-useCallback/Tarea1Memo"
import Tarea2Memo from "./07-useCallback/Tarea2Memo"
import UseCallback from "./07-useCallback/UseCallback"
import UseReducer from "./08-useReducer/UseReducer"
import UseContext from "./09-UseContext/UseContext"

const HookApp = () => {
    return (
        <>
            <header className="main-header">
                <div className="main-header-content l-container">
                    <h1 className="main-header__title"> Hooks app </h1>
                </div>
            </header>
            <main className="main-container">
                <div className="main-content l-container">
                    <section>
                        <h1>Select useState</h1>
                        <Countries />
                        <hr />
                    </section>
                    <section>
                        <h1>Select useState - Context</h1>
                        <ContextCountriesComponent />
                        <hr />
                    </section>
                    <section>
                        <h1>useState - Context - memo</h1>
                        <ThemeWithMemo />
                        <hr />
                    </section>
                    <section>
                        <h1>useState - Context</h1>
                        <ThemeWithoutMemo />
                        <hr />
                    </section>
                    <section>
                        <h1>useState</h1>
                        <CounterApp />
                        <hr />
                    </section>
                    <section>
                        <h1>useState With Custom Hook</h1>
                        <CounterAppWithCustomHook />
                        <hr />
                    </section>
                    <section>
                        <h1>useEffect with useState - BASIC</h1>
                        <AppTittle />
                        <hr />
                    </section>
                    <section>
                        <h1>Geolocation with useEffect</h1>
                        <Coordinates />
                        <hr />
                    </section>
                    <section>
                        <h1>MouseOver useEffect</h1>
                        <MouseOverWrapper />
                        <hr />
                    </section>
                    <section>
                        <h1>Resize useEffect</h1>
                        <Resize />
                        <hr />
                    </section>
                    <section>
                        <h1>Position useEffect</h1>
                        <PositionWrapper />
                        <hr />
                    </section>
                    <section>
                        <h1>Simple Form</h1>
                        <SimpleForm />
                        <hr />
                    </section>
                    <section>
                        <h1>Quotes</h1>
                        <QuotesApp />
                        <hr />
                    </section>
                    <section>
                        <h1>FocusScreen</h1>
                        <FocusScreen />
                        <hr />
                    </section>
                    <section>
                        <ToggleQuotes />
                        <hr />
                    </section>
                    <section>
                        <LayoutEffect />
                        <hr />
                    </section>
                    <section>
                        <h1>MethodMemo</h1>
                        <MethodMemo />
                        <hr />
                    </section>
                    <section>
                        <h1>Other MethodMemo</h1>
                        <Memorize />
                        <hr />
                    </section>
                    <section>
                        <h1>UseCallback</h1>
                        <UseCallback />
                        <hr />
                    </section>
                    <section>
                        <h1>Tarea1Memo</h1>
                        <Tarea1Memo />
                        <hr />
                    </section>
                    <section>
                        <h1>Tarea2Memo</h1>
                        <Tarea2Memo />
                        <hr />
                    </section>
                    <section>
                        <h1>useReducer</h1>
                        <UseReducer />
                        <hr />
                    </section>
                    <section>
                        <h1>Context</h1>
                        <UseContext />
                    </section>
                </div>
            </main>
        </>
    )
}

HookApp.propTypes = {}

export default HookApp