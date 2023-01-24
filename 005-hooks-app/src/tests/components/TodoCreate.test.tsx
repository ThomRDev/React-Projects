describe('Test <TodoCreate />', () => {
  // const addTodo = jest.fn()
  // const wrapper = shallow(<TodoCreate addTodo={addTodo}  />)
  test('snapshot', () => {
    // expect(wrapper).toMatchSnapshot()
  })
  test("Should not call the function addTodo",()=>{
    // const formsubmit = wrapper.find("form").prop("onSubmit")

    // deberia validar si no tiene informacion
    // formsubmit({ preventDefault(){} })

    // expect(addTodo).toHaveBeenCalled(0)
  })
  test("Should call the function addTodo",()=>{
    // const title = "Title"
    // wrapper.find("input").simulate("change",{
    //   preventDefault(){},
    //   target:{ 
    //     value : title,
    //     name:'title' 
    //   }
    // })
    // const formsubmit = wrapper.find("form").prop("onSubmit")
    // formsubmit({ preventDefault(){} })
    // expect(addTodo).toHaveBeenCalled(1)

    // verifica que el addTodo reciba cualquier objeto, ya sea un {} vacio
    // expect(addTodo).toHaveBeenCalledWith(expect.any(Object))
    
    // verifica que el addTodo reciba un objecto
    // expect(addTodo).toHaveBeenCalledWith({
    //   title,
    //   done: false,
    //   // id : expect.any(Number)
    //   id : expect.any(String)
    // })

    // verficando que se llamo el reset
    // validando si el input esta vacio
    // expect(wrapper.find("input").prop("value")).toBe("")
  })
})