import { shallowMount } from '@vue/test-utils'
import App from "@/App";

describe('App.vue', () => {
  it('is visible', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.isVisible()).toBe(true)
  })

  it('is Vue Instance', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.isVueInstance()).toBe(true)
  })

  // it('renders navbar', () => {
  //   const wrapper = shallowMount(App)
  //
  //   expect(wrapper.find("nav").isVisible()).toBe(true)
  // })
})

