import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia } from 'pinia'
import { flushPromises, mount } from '@vue/test-utils'

import TodayView from '@/views/TodayView.vue'

describe('TodayView', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-04T10:00:00'))
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('moves completed notes to the bottom and restored notes to the top', async () => {
    const wrapper = mount(TodayView, {
      global: {
        plugins: [createPinia()],
      },
    })

    await wrapper.get('button[aria-label="Complete Review distributions"]').trigger('click')
    expect(wrapper.find('.task-note-motion--tearing').exists()).toBe(true)

    await vi.advanceTimersByTimeAsync(250)
    await flushPromises()

    const completedNotes = wrapper.findAll('.task-note-motion')
    expect(completedNotes.findIndex((note) => note.text().includes('Review distributions'))).toBe(
      completedNotes.length - 1,
    )

    await vi.advanceTimersByTimeAsync(500)
    await wrapper.get('button[aria-label="Restore Review distributions"]').trigger('click')
    await vi.advanceTimersByTimeAsync(250)
    await flushPromises()

    expect(wrapper.findAll('.task-note-motion')[0]?.text()).toContain('Review distributions')
  })
})
