import { ActionTypes } from './../../../types/actions';
describe('Tests in types', () => {
  test('should return the types', () => {
    const types = ActionTypes
    expect(types).toEqual({ LOGIN: '[auth] Login', LOGOUT: '[auth] Logout' })
  })
})