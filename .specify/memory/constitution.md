# Curso-PSWE-07 Constitution

## Core Principles

### I. Simplicity First (YAGNI)
Code MUST implement only what the spec requires, using the simplest solution that works. Features, abstractions, configuration options, and dependencies MUST NOT be added "just in case"; any added complexity MUST be justified in writing in the plan (Complexity Tracking).
*Rationale: unrequested code is cost without value.*

### II. Simple, Clear Design
Functions and modules MUST be small with a single responsibility, and names MUST reveal intent. Abstractions MUST NOT be built for a single use, duplication is removed only when it is real, and optimization MUST NOT be done prematurely.
*Rationale: small, readable units are easier to test, change, and review.*

### III. Structured Architecture
Code MUST be separated into three layers: UI (screens and components), application logic (task operations), and persistence (storage). Dependencies MUST point one way only: UI → logic → persistence. UI code MUST NOT access storage directly, and persistence MUST sit behind a small interface so it can be replaced or faked in tests.
*Rationale: clear boundaries keep each layer replaceable and testable in isolation.*

### IV. Test-Driven Development (NON-NEGOTIABLE)
Development MUST follow Red-Green-Refactor: write a failing test, make it pass with the minimum code, then refactor. Production code MUST NOT exist without a test that required it. Business logic MUST have unit tests, and each user story MUST have at least one acceptance test mirroring its acceptance scenarios. Tests MUST be fast and independent.
*Rationale: tests written first prove the behavior and keep the design honest.*

### V. Spec Is the Source of Truth
Every implementation task MUST trace back to a requirement in the spec, and anything not in the spec is out of scope and MUST NOT be implemented. Ambiguous requirements MUST be clarified before implementation.
*Rationale: building from one agreed source prevents drift and scope creep.*

## Governance

This constitution supersedes other practices. Plans MUST pass a Constitution Check against these principles, and reviews MUST verify compliance. Amendments require a written change, and versions follow semantic versioning: MAJOR for removed or redefined principles, MINOR for added principles or material expansions, PATCH for clarifications.

**Version**: 1.0.0 | **Ratified**: 2026-10-22 | **Last Amended**: 2026-10-22
