// https://bobbyhadz.com/blog/typescript-cannot-find-name-describe
import calendarApi from '../../src/api/calendarApi'
import { getEnvVariables } from '../../src/helpers/getEnvVariables'
describe('Tests in CalendarApi', () => {
  test('should have default settings', () => {
    // console.log()
    const { VITE_API_URL } = getEnvVariables()
    // expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    expect(calendarApi.defaults.baseURL).toBe(VITE_API_URL)
  })
  test('should have the x-token in the header of all requests', async() => {
    const token = 'asdasdasd'
    localStorage.setItem('token',token)
    const response = await calendarApi.get('/auth')
    expect(response.config.headers!['x-token']).toBe(token)
  })
})