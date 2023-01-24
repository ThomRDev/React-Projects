
/*
  enzime: se enfoca a probar como funciona los componentes de forma aislada

  testing library : probar como quedan las modificaciones en pantalla despues de procesar los componentes
  y todo lo demas
*/



import { fireEvent, render, screen } from '@testing-library/react'
// import { Provider } from 'react-redux'
// import { store } from '../../../src/store'


import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';

jest.mock('../../../src/hooks/useCalendarStore');
const mockUseCalendarStore = useCalendarStore as jest.MockedFunction<typeof useCalendarStore>;

describe('Test in <FabDelete />', () => {

  
  const mockDeletingEvent = jest.fn()

  beforeEach( ()=> jest.clearAllMocks() );

  test('should render the component correctly', () => {

    // en este caso como este componente utiliza un custom hook que internamente
    // utiliza un hook de redux
    // tenermos que envolverlo en Provider
    // pero si hacemos tenemos que tambien mapear(y funcionamiento correctame4nte) el compotamiento de nuestro custom hook
    // dentro de nuestro componente de FabDelete
    // esto ya seria un test de integracion y no de un test unitario
    // esto se puede hacer despues pero luego de probar cada parte por separado tanto el componente como el custom hook
    // render(<Provider store={store}>
    //   <FabDelete />
    // </Provider>)

    // en este caso haremos un test unitario lo mas atomico posible
    // pero ya luego si se probo tanto el componente como el custom hook por separado de forma aislada
    // ya se puede hacer el test de integracion

    // para hacer que ese componente funcione de forma aislada, tenemos que crear un mock del
    // custom hook que estamos utilizando de tal manera no nos importara mucho como funciona
    // sino que las funciones que retorna este custom hook se ejecuten cuando hay algun cambio de estado
    // en mi componente

    // https://bobbyhadz.com/blog/typescript-get-return-type-of-function#:~:text=Use%20the%20ReturnType%20utility%20type,of%20the%20provided%20function%20type.
    mockUseCalendarStore.mockReturnValue({
      hasEventSelected:false
    } as ReturnType<typeof useCalendarStore>)
    
    render(<FabDelete />)
    // screen.debug()
    
    const btn = screen.getByLabelText('btn-delete')
    
    expect(btn.classList).toContain('btn')
    expect(btn.classList).toContain('btn-danger')
    expect(btn.classList).toContain('fab-danger')
    
    expect(btn.style.display).toBe('none')
  })
  
  test('should show the button if the event is active',() => {


    
    mockUseCalendarStore.mockReturnValue({
      hasEventSelected:true
    } as ReturnType<typeof useCalendarStore>)
    render(<FabDelete />)
    
    const btn = screen.getByLabelText('btn-delete')
    
    expect(btn.style.display).toBe('')
    
  })
  
  test('startDeletingEvent should be called if the event is active',async  () => {

    await mockDeletingEvent.mockResolvedValue(undefined)
    mockUseCalendarStore.mockReturnValue({
      hasEventSelected:true,
      startDeletingEvent:mockDeletingEvent
    } as any)
    render(<FabDelete />)
    const btn = screen.getByLabelText('btn-delete');
    fireEvent.click( btn );
    expect( mockDeletingEvent ).toHaveBeenCalledWith();
  })

})