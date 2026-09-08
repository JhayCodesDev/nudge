import { useState } from 'react'
import { NUDGE_PRIORITIES, createNudge } from '../utils/nudge.js'

const initialFormData = {
  title: '',
  note: '',
  dueDate: '',
  dueTime: '',
  priority: 'medium',
}

function NudgeForm({ onCreate }) {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [created, setCreated] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setCreated(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}

    if (!formData.title.trim()) {
      nextErrors.title = 'Enter a title for this nudge.'
    }

    if (!formData.dueDate) {
      nextErrors.dueDate = 'Choose a due date.'
    }

    if (!formData.dueTime) {
      nextErrors.dueTime = 'Choose a due time.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const dueAt = new Date(`${formData.dueDate}T${formData.dueTime}`)

    if (Number.isNaN(dueAt.getTime())) {
      setErrors({ dueDate: 'Enter a valid due date and time.' })
      return
    }

    onCreate(
      createNudge({
        title: formData.title,
        note: formData.note,
        dueAt: dueAt.toISOString(),
        priority: formData.priority,
      }),
    )

    setFormData(initialFormData)
    setErrors({})
    setCreated(true)
  }

  return (
    <form className="mt-8 w-full max-w-md space-y-5 text-left" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="block text-sm font-medium" htmlFor="title">
          Title
        </label>
        <input
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          id="title"
          name="title"
          onChange={handleChange}
          value={formData.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600" id="title-error">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="note">
          Note <span className="text-slate-500">(optional)</span>
        </label>
        <textarea
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          id="note"
          name="note"
          onChange={handleChange}
          rows="3"
          value={formData.note}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="dueDate">
            Due date
          </label>
          <input
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            id="dueDate"
            name="dueDate"
            onChange={handleChange}
            type="date"
            value={formData.dueDate}
            aria-describedby={errors.dueDate ? 'due-date-error' : undefined}
            aria-invalid={Boolean(errors.dueDate)}
          />
          {errors.dueDate && <p className="mt-1 text-sm text-red-600" id="due-date-error">{errors.dueDate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="dueTime">
            Due time
          </label>
          <input
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            id="dueTime"
            name="dueTime"
            onChange={handleChange}
            type="time"
            value={formData.dueTime}
            aria-describedby={errors.dueTime ? 'due-time-error' : undefined}
            aria-invalid={Boolean(errors.dueTime)}
          />
          {errors.dueTime && <p className="mt-1 text-sm text-red-600" id="due-time-error">{errors.dueTime}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="priority">
          Priority
        </label>
        <select
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          id="priority"
          name="priority"
          onChange={handleChange}
          value={formData.priority}
        >
          {NUDGE_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button className="w-full rounded bg-indigo-600 px-4 py-2 font-medium text-white" type="submit">
        Create nudge
      </button>

      {created && <p className="text-center text-sm text-green-700" role="status">Nudge created.</p>}
    </form>
  )
}

export default NudgeForm
