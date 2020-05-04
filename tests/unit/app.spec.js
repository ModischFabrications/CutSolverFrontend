import {shallowMount, createLocalVue, mount} from '@vue/test-utils'
import App from "@/App";

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

// create an extended `Vue` constructor to install plugins locally
const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(IconsPlugin);


describe('App.vue', () => {
  it('is proper instance', () => {
    // pass `localVue` to the mount options to actually use it
    const wrapper = shallowMount(App, {localVue})

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('is visible', () => {
    const wrapper = shallowMount(App, {localVue})

    expect(wrapper.isVisible()).toBe(true)
  })

  // it('renders navbar', () => {
  //   const wrapper = shallowMount(App)
  //
  //   expect(wrapper.find("nav").isVisible()).toBe(true)
  // })
})

