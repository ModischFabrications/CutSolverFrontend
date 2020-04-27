import { shallowMount } from '@vue/test-utils'
import App from "@/App";

describe('App.vue', () => {
  it('renders navbar', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.find("NavBar").isVisible()).toBe(true)
  })
})

