import { render, screen } from "@testing-library/react"
import { UserContext } from "../../09-UseContext/contexts/UserContext"
import HomePage from "../../09-UseContext/pages/HomePage"

describe('Tests in <HomePage />', () => {

  const user = {
    id: 1,
    name : "Thom"
  }

  test('should display the component without user', () => {
    render(
      <UserContext.Provider value={{ user:null  }}>
        <HomePage />
      </UserContext.Provider>
    )
    const preTag = screen.getByLabelText("user")
    expect(preTag.innerHTML).toBe("null")
  })
  test('should display the component with user', () => {
    render(
      <UserContext.Provider value={{ user  }}>
        <HomePage />
      </UserContext.Provider>
    )
    const preTag = screen.getByLabelText("user")
    expect(preTag.innerHTML).toContain(user.name.toString())
    expect(preTag.innerHTML).toContain(user.id.toString())
  })
})

// en los test no funcionan el archivo barril