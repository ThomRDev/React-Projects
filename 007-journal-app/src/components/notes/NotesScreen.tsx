import NotesAppBar from "./NotesAppBar"

const NotesScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input type="text" placeholder="Some awesome title" 
        autoComplete="off"
        className="notes__title-input" />
        <textarea name="" 
        autoComplete="off"
        placeholder="What happened today" className="notes__textarea"></textarea>
        <div className="notes__img">
          <img src="https://www.creativefabrica.com/wp-content/uploads/2021/06/12/mountain-landscape-illustration-design-b-Graphics-13326021-1.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default NotesScreen