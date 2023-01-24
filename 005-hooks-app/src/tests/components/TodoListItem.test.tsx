// enzime u.u


// import { TodoItem } from "../../components/08-useReducer/UseReducer"
// import renderer from "react-test-renderer"
// import { demoTodos } from "../fixtures/demoTodos"
describe('<TodoItem />', () => {


  // const toggleTodo = jest.fn()
  // const deleteTodo = jest.fn()
  // const wrapper = shallow(<TodoItem  todo={demoTodos[0]} toggleTodo={toggleTodo} deleteTodo={deleteTodo}  />)

  test('must show correctly the snapshot', () => {
    // const tree = renderer.create(<TodoItem  />).toJSON()
    // expect(tree).toMatchSnapshot()
    
    // expect(wrapper).toMatchSnapshot()
  })
  test('must call a handleDelete function', () => {
    // wrapper.find("button").simulate("click")
    
    // expect(deleteTodo).toHaveBeenCalledWith("123456")
    // expect(deleteTodo).toHaveBeenCalled()
  })
  test('must call a handleToggle function', () => {
    // wrapper.find("p").simulate("click")
    // expect(toggleTodo).toHaveBeenCalled()
    // expect(toggleTodo).toHaveBeenCalledWith("123456")
  })
  test('must have completed class when click in handleToggle function', () => {
    
    // const todo = demoTodos[0]
    // todo.done = true

    // const wrapper = shallow(<TodoItem  todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}  />)
    // expect(wrapper.find("p").hasClass("complete")).toBe(true)
  })
})