import { mount } from '@vue/test-utils'
import ActivityList from '../../src/components/ActivityList.vue'

describe('ActivityList.vue', () => {
  it('renders activity form', () => {
    const wrapper = mount(ActivityList)
    expect(wrapper.element).toMatchSnapshot()
  })
})
