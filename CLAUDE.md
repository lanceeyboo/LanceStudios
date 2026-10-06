# CLAUDE.md

## MANDATORY AI OPERATING RULES

This file contains the mandatory operating instructions for any AI agent, coding model, or automated development tool working in this repository.

These rules apply to EVERY prompt, EVERY task, EVERY session, and EVERY agent operating in this repository.

### 1. READ THIS FILE FIRST

Before responding to ANY user prompt or performing ANY tool operation:

1. Read this `CLAUDE.md`.
2. Follow all applicable rules in this file.
3. Treat these instructions as persistent project-level requirements.
4. Do not assume previous context is sufficient; re-check these instructions in every new session.

No implementation, file modification, shell command, repository search, refactor, or architectural decision may begin before these instructions are understood.

### 2. THIS FILE IS IMMUTABLE

`CLAUDE.md` is an instruction-only file.

AI agents MUST NOT:

- modify this file
- overwrite this file
- delete this file
- rename this file
- rewrite this file
- automatically update this file
- generate changes to this file
- "improve" or "clean up" this file
- add instructions to this file
- remove instructions from this file

Changes to this file are prohibited unless the developer explicitly and directly requests a change to `CLAUDE.md`.

Do not interpret project changes as permission to update this file.

---

# PROJECT OVERVIEW

Describe what the project is about in this markdown file so the agent understands the purpose, architecture, and goals after every new session.

Keep the project overview updated whenever major architectural or product changes happen.

---

# GENERAL PRINCIPLES

- Generate concise, short solutions for new modules or code.
- Watch for over-engineering and oversized files needing refactoring.
- Watch for weird syntax or style mismatching the existing codebase.
- Watch for obvious bugs.
- Prioritize concise, precise code and documentation changes.
- No emojis or special characters in comments.
- Write `activity-log.md` in `/docs` to refer back if confused.
- Make a to-do list for significant work.
- Run major changes by the user first.
- Review existing files before refactoring or changing them.
- Markdown files must use kebab-case naming, for example `some-description-changes.md`.
- Do not auto-commit activity logs or documentation.
- Comments must be one sentence and one line.

---

# GRAPHIFY

This project has a knowledge graph at `graphify-out/` containing god nodes, community structure, and cross-file relationships.

## Graphify Rules

For codebase questions:

1. When `graphify-out/graph.json` exists, first run:

   `graphify query "<question>"`

2. Use:

   `graphify path "<A>" "<B>"`

   when investigating relationships between two concepts or files.

3. Use:

   `graphify explain "<concept>"`

   for focused investigation of a concept.

These commands return scoped subgraphs and should be preferred over reading the entire repository or using broad raw grep output.

If `graphify-out/wiki/index.md` exists, use it for broad project navigation instead of raw source browsing.

Read `graphify-out/GRAPH_REPORT.md` only when:

- performing a broad architecture review, or
- `query`, `path`, and `explain` do not provide enough context.

After modifying code, run:

`graphify update .`

This keeps the knowledge graph current.

Graphify updates are AST-only and do not require an API call.

Do not unnecessarily rebuild the entire graph when a targeted Graphify query is sufficient.

---

# PLANNING WORKFLOW

For high-risk or large changes:

1. Research first.
2. Perform a gap analysis.
3. Analyze the blast radius.
4. Check missing requirements, edge cases, and dependencies.
5. Create a detailed implementation plan.
6. Create a contract file for high-risk changes before implementation.
7. Present the research, gap analysis, blast radius, contract, and implementation plan to the developer.
8. Ask clarification questions whenever requirements are incomplete or ambiguous.
9. The developer is the final verifier.
10. Do not begin implementation until the developer approves the plan.

---

# DEVELOPMENT WORKFLOW

- Builder agent implements only after the approved plan.
- Reviewer agent validates the implementation after completion.
- Review for correctness, regressions, consistency, performance, and security.
- Verify that implementation matches the approved contract and plan.
- Do not modify unrelated files.

---

# DOCUMENTATION

- Create `/docs/activity-log.md` to record significant work.
- Create `/docs/mistakes.md` to record recurring mistakes so they are not repeated.
- Keep documentation synchronized with implementation.
- Do not auto-commit activity logs or documentation.
- Do not modify `CLAUDE.md` as part of documentation synchronization.

---

# CODE QUALITY

- Use appropriate data structures and algorithms.
- Follow least-privilege principles.
- Do not expose data unnecessarily.
- Do not introduce external libraries unless absolutely necessary.
- Use the project's dependency file for correct versions.
- Avoid redundancy unless it improves usability.
- Preserve existing project conventions unless there is an approved reason to change them.

---

# VERSION CONTROL

- Commit after significant changes.
- Use clear commit messages.
- Keep commits focused and atomic.
- Never automatically push any branch.
- Never automatically push to a remote repository.

---

# AI RESTRICTIONS

Never expose, generate, request unnecessarily, or commit:

- customer personal data
- names
- contacts
- account numbers
- transactions
- passwords
- API keys
- authentication tokens
- connection strings
- other credentials or secrets

Only handle restricted data when an explicitly approved exemption exists.

Never place credentials or secrets into source code, documentation, logs, prompts, commits, or generated files.

---

# USER APPROVAL

The developer/user is the final authority for implementation decisions.

Do not interpret silence as approval.

Do not implement major architectural changes without approval.

Do not silently expand the scope of a task.

If requirements are ambiguous, ask before implementing.

---

# VALIDATION CHECKLIST

Before considering any task complete:

- Verify requirements are fully implemented.
- Verify no unrelated files were modified.
- Verify no regression was introduced.
- Verify documentation is updated if necessary.
- Verify the implementation follows the approved contract.
- Verify Graphify is updated after code changes.
- Verify `CLAUDE.md` was not modified.
- Verify no credentials or sensitive information were introduced.