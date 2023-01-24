
describe('TodoApp', () => {

  // const wrapper= shallow(<UseReducer />)

  test('snapshot', () => {
    // expect(wrapper).toMatchSnapshot()
  })

  test('Must add a todo', () => {
    // mount nos servidrá para pobar toda la aplicacion, generar todo el html
    // funciona igual que el shallow, solo que ahora renderiza todo
    // const wrapper = mount(<UseReducer />)
    
    // verficar si se llama al localstorage
    // Storage.prototype.setItem = jest.fn(()=>{})

    // de @testing-library/react
    // tenemos que envolverlo en un act ya que es una accion
    // de un hook
    // act(()=>{
    //   wrapper.find("TodoCreate").prop("addTodo")(demosTodos[0])
    //   wrapper.find("TodoCreate").prop("addTodo")(demosTodos[1])
    // })
    
    // en caso que muestre en la app la cantidad de todos que tengo
    // expect(wrapper.find("h1").text().trim()).toBe("2")
    
    // expect(localStorage.setItem).toHaveBeenCalled(2)
    // expect(localStorage.setItem).not.toHaveBeenCalledWith({})
  })
  
  test('Must delete a todo', () => {
    // wrapper.find("TodoCreate").prop("addTodo")(demosTodos[0])
    // wrapper.find("TodoList").prop("deleteTodo")(demosTodos[0].id)

    // expect(wrapper.fin("h1").text().trim()).toBe("0")
    
  })

})