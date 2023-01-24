import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addHours, differenceInSeconds } from "date-fns";
import es from "date-fns/locale/es";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUIStore } from "../../hooks";
import { ACTIVE_EVENT_TYPE, Event } from "../../store";
// colocando el datepicker en español con date-fns
registerLocale("es", es);

const customStyles: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    // width: 'min(600px,90%)',
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  // overlay:{
  //   background: 'hsla(0, 0%, 0%, 0.6)'
  // }
};

Modal.setAppElement("#root");

const FORM_STATE = {
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
}

export const CalendarModal = () => {
  // const [isOpenModal, setIsOpenModal] = useState(true);
  const { isDateModalOpen,closeDateModal } = useUIStore()

  const { activeEvent,clearActiveNote,startSavingEvent } = useCalendarStore()

  const [formSubmitted,setFormSubmitted] = useState(false)

  const [formState, setFormState] = useState<Event | Omit<Event, "id"> >(FORM_STATE as Event);

  useEffect(()=>{
    if(activeEvent != null) {
      setFormState({
        ...activeEvent.event
      })
    }
  },[activeEvent])
  // validacion para el titulo
  const tittleClass = useMemo(()=>{
    if(!formSubmitted) return ''
    return (formState.title.trim().length > 0) ? '' : 'is-invalid'
  },[formState.title,formSubmitted])

  const onInputChanged = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((form_state) => ({
      ...form_state,
      [event.target.name]: event.target.value,
    }));
  };

  const onDatePikerChanged = (date: Date, type: string) => {
    setFormState((form_state) => ({
      ...form_state,
      [type]: date,
    }));
  };

  const onSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormSubmitted(true)
    

    console.log(formState)
    const difference = differenceInSeconds(formState.end,formState.start)

    if(isNaN(difference) || difference<=0){
      Swal.fire('Fechas incorrectas','Revisar las fechas ingresadas','error');
      return;
    }
    if ( formState.title.trim().length <= 0 ) {
      Swal.fire('Titulo incorrecto','El titulo debe contener caracteres validos','error');
      return
    };

    await startSavingEvent(formState as Event)
    // setIsOpenModal(false);
    closeDateModal()
    clearActiveNote()
    setFormSubmitted(false)
  }

  const onCloseModal = (event: React.MouseEvent<Element, MouseEvent>) => {
    console.log("cerrando modal");
    // setIsOpenModal(false);
    closeDateModal()
    clearActiveNote()
  };

  return (
    <Modal
      // isOpen={true}
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      // clase al contenido
      className="modal"
      // clase al wrapper del contenido
      overlayClassName="modal-fondo"
      // cuando desaparece en 200ms
      closeTimeoutMS={200}

      // shouldCloseOnOverlayClick={false}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          {/* <input className="form-control" placeholder="Fecha inicio" /> */}
          <DatePicker
            selected={formState.start}
            onChange={(event: Date) => onDatePikerChanged(event, "start")}
            className="form-control"
            // para poder ver la fecha y hora
            dateFormat="Pp"
            // para poder seleccionar la hora minutos
            showTimeSelect
            // cambiando a español pero primero se debe de configurar registerLocale("es", es);
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formState.start}
            selected={formState.end}
            onChange={(event: Date) => onDatePikerChanged(event, "end")}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${tittleClass}`}
            placeholder="Título del evento"
            name="title"
            value={formState.title}
            onChange={onInputChanged}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formState.notes}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
