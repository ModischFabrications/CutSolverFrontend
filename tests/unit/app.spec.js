import {shallowMount, createLocalVue, mount} from '@vue/test-utils'
import App from "@/App";

import {BNavItem, BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import NavBar from "@/components/NavBar";
import version from '@/../package.json';

// create an extended `Vue` constructor to install plugins locally
const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(IconsPlugin);

describe('App.vue', () => {
  it('is proper instance', () => {
    // pass `localVue` to the mount options to actually use it
    const wrapper = shallowMount(App, {localVue});

    expect(wrapper.vm).toBeTruthy();
  })

  it('is visible', () => {
    const wrapper = shallowMount(App, {localVue});

    expect(wrapper.isVisible()).toBeTruthy();
  })

  it('has navbar', () => {
    const wrapper = mount(App, {localVue});

    expect(wrapper.getComponent(NavBar).exists()).toBeTruthy();
  })

  it('has logo', () => {
    const wrapper = mount(App, {localVue});

    // this should check for (no) alt text, no idea how
    expect(wrapper.get("#logoIcon").exists()).toBeTruthy();
  })

  it('has 3 navbar items', () => {
    const wrapper = mount(App, {localVue});

    // pretty useless, but a nice example for later
    expect(wrapper.findAllComponents(BNavItem).length).toBe(3);
  })

  it('has matching version code', () => {
    const wrapper = mount(App, {localVue});
    const versionCode = "v" + version.version;

    expect(wrapper.get(".footer").text()).toContain(versionCode);
  })

  // TODO extend with a lot more tests
})
