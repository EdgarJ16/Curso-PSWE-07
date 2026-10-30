# Quickstart: Validating the To-Do List App

## Prerequisites
- Node 22+ and npm

## Setup and run
```bash
npm install
npm test          # unit and acceptance tests
npm run dev       # open the printed local URL
```

## Manual validation scenarios
1. **Empty state**: first load shows "Curso-PSWE-07" in the header and a friendly empty message.
2. **Add**: click "Add task", save with an empty title (validation message appears), then save with a title; the task shows as pending.
3. **Persistence**: reload the page; the task is still there.
4. **Status**: open the task, choose "Mark as done"; go back and see strikethrough, muted text.
5. **Filter**: select Pending, then Done, then All; only matching tasks show, active option highlighted.
6. **Edit**: open a task, Edit, change the title, Save; Detail shows the new title.
7. **Delete**: open a task, Delete, cancel the confirmation (task kept), Delete again and confirm (task gone, list shown).
8. **Responsive**: resize to about 360 px wide; no horizontal scroll, controls at least 44x44 px.

See [data-model.md](data-model.md) and [contracts/ui-and-storage.md](contracts/ui-and-storage.md) for details.
