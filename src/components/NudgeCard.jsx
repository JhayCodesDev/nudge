import { useEffect, useState } from "react";
import { formatDueAt } from "../utils/dates.js";
import { NUDGE_PRIORITIES } from "../utils/nudge.js";

function getLocalDateValue(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return { dueDate: "", dueTime: "" };
  }

  return {
    dueDate: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
    dueTime: `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`,
  };
}

function NudgeCard({ nudge, onUpdate, onDelete, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: nudge.title,
    note: nudge.note,
    dueDate: "",
    dueTime: "",
    priority: nudge.priority,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const { dueDate, dueTime } = getLocalDateValue(nudge.dueAt);

    setFormData({
      title: nudge.title,
      note: nudge.note,
      dueDate,
      dueTime,
      priority: nudge.priority,
    });
    setErrors({});
  }, [nudge]);

  function handleEditChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleEditSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = "Enter a title for this nudge.";
    }

    if (!formData.dueDate) {
      nextErrors.dueDate = "Choose a due date.";
    }

    if (!formData.dueTime) {
      nextErrors.dueTime = "Choose a due time.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const dueAt = new Date(`${formData.dueDate}T${formData.dueTime}`);

    if (Number.isNaN(dueAt.getTime())) {
      setErrors({ dueDate: "Enter a valid due date and time." });
      return;
    }

    onUpdate({
      ...nudge,
      title: formData.title.trim(),
      note: formData.note.trim(),
      dueAt: dueAt.toISOString(),
      priority: formData.priority,
      updatedAt: new Date().toISOString(),
    });

    setIsEditing(false);
    setErrors({});
  }

  function handleDelete() {
    const confirmed = window.confirm("Delete this nudge?");

    if (confirmed) {
      onDelete(nudge.id);
    }
  }

  return (
    <article
      className={`rounded border p-4 text-left shadow-sm ${
        nudge.completed
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-white"
      }`}
    >
      {isEditing ? (
        <form className="space-y-4" onSubmit={handleEditSubmit} noValidate>
          <div>
            <label
              className="block text-sm font-medium"
              htmlFor={`edit-title-${nudge.id}`}
            >
              Title
            </label>
            <input
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              id={`edit-title-${nudge.id}`}
              name="title"
              onChange={handleEditChange}
              value={formData.title}
              aria-describedby={
                errors.title ? `edit-title-error-${nudge.id}` : undefined
              }
              aria-invalid={Boolean(errors.title)}
            />
            {errors.title && (
              <p
                className="mt-1 text-sm text-red-600"
                id={`edit-title-error-${nudge.id}`}
              >
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium"
              htmlFor={`edit-note-${nudge.id}`}
            >
              Note <span className="text-slate-500">(optional)</span>
            </label>
            <textarea
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              id={`edit-note-${nudge.id}`}
              name="note"
              onChange={handleEditChange}
              rows="3"
              value={formData.note}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium"
                htmlFor={`edit-dueDate-${nudge.id}`}
              >
                Due date
              </label>
              <input
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
                id={`edit-dueDate-${nudge.id}`}
                name="dueDate"
                onChange={handleEditChange}
                type="date"
                value={formData.dueDate}
                aria-describedby={
                  errors.dueDate ? `edit-due-date-error-${nudge.id}` : undefined
                }
                aria-invalid={Boolean(errors.dueDate)}
              />
              {errors.dueDate && (
                <p
                  className="mt-1 text-sm text-red-600"
                  id={`edit-due-date-error-${nudge.id}`}
                >
                  {errors.dueDate}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium"
                htmlFor={`edit-dueTime-${nudge.id}`}
              >
                Due time
              </label>
              <input
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
                id={`edit-dueTime-${nudge.id}`}
                name="dueTime"
                onChange={handleEditChange}
                type="time"
                value={formData.dueTime}
                aria-describedby={
                  errors.dueTime ? `edit-due-time-error-${nudge.id}` : undefined
                }
                aria-invalid={Boolean(errors.dueTime)}
              />
              {errors.dueTime && (
                <p
                  className="mt-1 text-sm text-red-600"
                  id={`edit-due-time-error-${nudge.id}`}
                >
                  {errors.dueTime}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium"
              htmlFor={`edit-priority-${nudge.id}`}
            >
              Priority
            </label>
            <select
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              id={`edit-priority-${nudge.id}`}
              name="priority"
              onChange={handleEditChange}
              value={formData.priority}
            >
              {NUDGE_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              className="rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
              type="submit"
            >
              Save changes
            </button>
            <button
              className="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`font-semibold ${nudge.completed ? "text-slate-500 line-through" : "text-slate-900"}`}
            >
              {nudge.title}
            </h3>
            <div className="flex items-center gap-2">
              {nudge.completed && (
                <span className="rounded bg-emerald-100 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-emerald-700">
                  Completed
                </span>
              )}
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium capitalize text-slate-700">
                {nudge.priority}
              </span>
            </div>
          </div>

          {nudge.note && (
            <p
              className={`mt-2 text-sm ${nudge.completed ? "text-slate-500 line-through" : "text-slate-600"}`}
            >
              {nudge.note}
            </p>
          )}

          <p
            className={`mt-3 text-sm ${nudge.completed ? "text-slate-500 line-through" : "text-slate-700"}`}
          >
            <span className="font-medium">Due:</span> {formatDueAt(nudge.dueAt)}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="rounded border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
            {!nudge.completed && (
              <button
                className="rounded bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white"
                type="button"
                onClick={() => onComplete(nudge.id)}
              >
                Complete
              </button>
            )}
          </div>
        </>
      )}
    </article>
  );
}

export default NudgeCard;
