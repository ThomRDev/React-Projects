import renderer from "react-test-renderer"
import HookApp from "../components/HookApp"
describe(`Tests in ${__filename} component`, () => {
  test('Create Snapshot', () => {
    const tree = renderer.create(<HookApp />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})