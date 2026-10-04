import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'

import WeekView from '@/views/WeekView.vue'

describe('WeekView', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-03T10:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders seven independent day columns without project rows', () => {
    const wrapper = mount(WeekView, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(wrapper.findAll('.week-day')).toHaveLength(7)
    expect(wrapper.findAll('.project-row')).toHaveLength(0)
    expect(wrapper.text()).toContain('Statistics')
    expect(wrapper.text()).toContain('Programming ES')
    expect(wrapper.text()).not.toContain('Projects ↓')
  })
})
