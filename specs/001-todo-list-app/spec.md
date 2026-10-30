# Feature Specification: Curso-PSWE-07 To-Do List App

**Feature Branch**: `001-todo-list-app`

**Created**: 2026-10-22

**Status**: Draft

**Input**: User description: "Build a simple to-do list application named 'Curso-PSWE-07' that helps users organize and track their daily tasks, with a To-Do List screen and a To-Do Detail screen, persistent tasks, and a clean minimal visual design."

## Clarifications

### Session 2026-10-29 (recommended defaults applied; revisit if wrong)

- Q: What kind of application? → A: Web app, tasks stored in browser local storage.
- Q: List order? → A: Oldest first (creation order).
- Q: Add/edit form presentation? → A: Separate full-screen view, keeping the two-screen model.
- Q: Navigation after save/delete? → A: Save returns to the task's detail; Delete returns to the list. Cancel returns to where the form was opened from.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View and add tasks (Priority: P1)

A user opens the app, sees their task list under the "Curso-PSWE-07" header, and adds a new task with a required title and an optional description.

**Why this priority**: Adding and seeing tasks is the core value; without it nothing else is useful.

**Independent Test**: Open the app, add a task, and confirm it appears in the list. This alone is a viable MVP.

**Acceptance Scenarios**:

1. **Given** no tasks exist, **When** the user opens the To-Do List screen, **Then** a short friendly empty state is shown.
2. **Given** the To-Do List screen, **When** the user taps "Add task", **Then** a form with title and description fields opens.
3. **Given** the add form with a non-empty title, **When** the user saves, **Then** the task appears in the list as not done.
4. **Given** the add form with an empty title, **When** the user tries to save, **Then** a validation message is shown and no task is created.
5. **Given** the add form, **When** the user cancels, **Then** no task is created.

---

### User Story 2 - Persist tasks across sessions (Priority: P1)

A user closes and reopens the app and finds all their tasks, with their status, as they left them.

**Why this priority**: A to-do list that loses data is unusable.

**Independent Test**: Add tasks, change one's status, close and reopen the app, and confirm everything is unchanged.

**Acceptance Scenarios**:

1. **Given** tasks were added, **When** the app is closed and reopened, **Then** the same tasks are shown.
2. **Given** a task was edited, marked done, or deleted, **When** the app is closed and reopened, **Then** the change is still reflected.

---

### User Story 3 - Open a task and change its status (Priority: P2)

A user taps a task to open its detail screen, sees its title, description, and status, and marks it done or not done.

**Why this priority**: Tracking completion is the purpose of the list, but it depends on tasks existing.

**Independent Test**: Open a task, mark it done, go back, and confirm the row shows strikethrough and muted color.

**Acceptance Scenarios**:

1. **Given** a task in the list, **When** the user taps its row, **Then** the To-Do Detail screen opens showing the title, the description below it, and a status label (Done / Pending).
2. **Given** a task with no description, **When** its detail is shown, **Then** a muted "No description" is displayed.
3. **Given** a pending task, **When** the user chooses "Mark as done", **Then** the status becomes Done and the action label changes to "Mark as not done".
4. **Given** a done task, **When** the user chooses "Mark as not done", **Then** the status becomes Pending and the label changes to "Mark as done".
5. **Given** a done task, **When** the user returns to the list, **Then** its row shows strikethrough text in a muted color.
6. **Given** the detail screen, **When** the user uses the back control, **Then** the To-Do List screen is shown.

---

### User Story 4 - Filter tasks by status (Priority: P2)

A user filters the list by All, Pending, or Done.

**Why this priority**: Filtering helps focus once the list grows, but the list works without it.

**Independent Test**: With a mix of done and pending tasks, select each filter and confirm only matching tasks show.

**Acceptance Scenarios**:

1. **Given** the To-Do List screen, **When** it opens, **Then** "All" is the active filter and is highlighted.
2. **Given** a mix of tasks, **When** the user selects "Pending", **Then** only not-done tasks are shown and "Pending" is highlighted.
3. **Given** a mix of tasks, **When** the user selects "Done", **Then** only done tasks are shown and "Done" is highlighted.
4. **Given** no task matches the active filter, **When** the list is shown, **Then** a short friendly empty state is shown.

---

### User Story 5 - Edit a task (Priority: P3)

A user edits the title and description of an existing task using the same form as adding.

**Why this priority**: Useful for corrections, but not needed for basic tracking.

**Independent Test**: Open a task, edit its title, save, and confirm the new title appears in detail and list.

**Acceptance Scenarios**:

1. **Given** the detail screen, **When** the user chooses "Edit", **Then** the add-task form opens prefilled with the task's title and description, with Save and Cancel buttons.
2. **Given** the edit form with a valid title, **When** the user saves, **Then** the changes are stored and shown.
3. **Given** the edit form with an empty title, **When** the user tries to save, **Then** a validation message is shown and the task is unchanged.
4. **Given** the edit form, **When** the user cancels, **Then** the task is unchanged.

---

### User Story 6 - Delete a task (Priority: P3)

A user deletes a task after confirming.

**Why this priority**: Cleanup is valuable but least critical, and is destructive so needs a safeguard.

**Independent Test**: Delete a task, confirm, and verify it is gone from the list.

**Acceptance Scenarios**:

1. **Given** the detail screen, **When** the user chooses "Delete", **Then** a confirmation is requested before anything is removed.
2. **Given** the confirmation, **When** the user confirms, **Then** the task is removed and the To-Do List screen is shown.
3. **Given** the confirmation, **When** the user cancels, **Then** the task is kept.

---

### Edge Cases

- A title containing only whitespace is treated as empty and rejected with the validation message.
- Very long titles or descriptions wrap or truncate without breaking the layout on mobile or desktop.
- Marking the last task of the active filter as done or not done leaves the filter active and shows the empty state if nothing matches.
- Stored task data is unreadable or missing on startup: the app opens with an empty list instead of failing.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST show the name "Curso-PSWE-07" in the header of the To-Do List screen and as the application/window title.
- **FR-002**: The system MUST provide two screens: To-Do List and To-Do Detail.
- **FR-003**: Users MUST be able to add a task with a required title and an optional description; new tasks start as not done.
- **FR-004**: The system MUST reject an empty or whitespace-only title when adding or editing, showing a validation message.
- **FR-005**: The To-Do List screen MUST show each task as a row with a status indicator and the title; done tasks MUST appear with strikethrough and muted color.
- **FR-006**: Tapping a row MUST open the To-Do Detail screen for that task.
- **FR-007**: The To-Do List screen MUST provide a three-option filter (All, Pending, Done) with the active option highlighted; the default is All.
- **FR-008**: The system MUST show a short friendly empty state when there are no tasks or none match the active filter.
- **FR-009**: The To-Do List screen MUST have a clearly visible "Add task" button that opens a form with title and description fields.
- **FR-010**: The To-Do Detail screen MUST show a back control, a prominent title, the description below it (muted "No description" if empty), and a visible status label (Done / Pending).
- **FR-011**: The To-Do Detail screen MUST offer three actions: Edit, Mark as done / Mark as not done (label reflecting the current status), and Delete.
- **FR-012**: Edit MUST reuse the add-task form, prefilled, with Save and Cancel buttons.
- **FR-013**: Delete MUST use a distinct warning color and MUST ask for confirmation before removing the task.
- **FR-014**: The system MUST persist tasks so they remain after the application is closed and reopened.
- **FR-015**: The visual design MUST use a light background, generous white space, a single accent color for primary actions and the active filter, and one sans-serif font family, with titles larger and bolder than descriptions.
- **FR-016**: Text MUST have sufficient contrast, and touch/click targets MUST be at least 44x44 px.
- **FR-017**: The layout MUST be responsive for mobile and desktop.

### Key Entities

- **Task**: A unit of work the user tracks. Attributes: title (required), description (optional), completion status (done / not done).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can add a task in under 15 seconds from the To-Do List screen.
- **SC-002**: 100% of tasks, with their content and status, are present after closing and reopening the app.
- **SC-003**: A first-time user can add a task, mark it done, and delete it without instructions.
- **SC-004**: Every interactive control has a target of at least 44x44 px, and body text meets a contrast ratio of at least 4.5:1.
- **SC-005**: Both screens are fully usable, with no horizontal scrolling or clipped controls, at phone widths (around 360 px) and desktop widths (1280 px and up).
- **SC-006**: Changing the filter updates the visible list in under 1 second.

## Assumptions

- A single user uses the app on a single device; there are no accounts or sync.
- Tasks are stored locally on the user's device.
- The list is shown in creation order, since sorting is not specified.
- Out of scope: accounts, categories, due dates, priorities, search, and sync.
