
const JournalEntry = () => {
  return (
    <div className="journal__entry">
      <div className="journal__entry-picture"
        style={{
          backgroundSize:"cover",
          backgroundPosition:"center",
          backgroundImage:"url(https://i.ytimg.com/vi/84-NvRbtfrQ/maxresdefault.jpg)"
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">Lorem ipsum dolor sit amet consectetur</p>
        <p className="journal__entry-content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem cum</p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  )
}

export default JournalEntry