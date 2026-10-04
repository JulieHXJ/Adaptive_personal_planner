import { describe, it, expect } from 'vitest'

import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders the primary sidebar information architecture', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
          RouterView: true,
        },
      },
    })

    expect(wrapper.text()).toContain('Adaptive Planner')
    expect(wrapper.text()).toContain('Today')
    expect(wrapper.text()).toContain('Weekly View')
    expect(wrapper.text()).toContain('My Projects')
    expect(wrapper.text()).toContain('New Project')
    expect(wrapper.text()).toContain('Statistics')

    await wrapper.get('button[aria-label="Toggle project list"]').trigger('click')

    expect(wrapper.text()).not.toContain('Statistics')
  })
})
