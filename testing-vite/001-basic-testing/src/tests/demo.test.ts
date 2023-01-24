describe('Demo test', () => {
  test('should return 1', () => {
    // if(1 == 1) {
    //   throw new Error("Error must be 1")
    // }
    // arrange
    const message = "hello world"

    // act
    const newMessage = message.trim()
    
    // asserts
    expect( message ).toBe(newMessage)
  })
});
