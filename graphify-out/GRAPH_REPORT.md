# Graph Report - LanceStudios  (2026-11-07)

## Corpus Check
- 4 files · ~3,346,742 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 31 nodes · 29 edges · 4 communities (3 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7460065d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- CLAUDE.md
- MANDATORY AI OPERATING RULES
- GRAPHIFY
- Activity Log

## God Nodes (most connected - your core abstractions)
1. `Activity Log` - 13 edges
2. `MANDATORY AI OPERATING RULES` - 3 edges
3. `GRAPHIFY` - 2 edges
4. `1. READ THIS FILE FIRST` - 1 edges
5. `2. THIS FILE IS IMMUTABLE` - 1 edges
6. `PROJECT OVERVIEW` - 1 edges
7. `GENERAL PRINCIPLES` - 1 edges
8. `Graphify Rules` - 1 edges
9. `PLANNING WORKFLOW` - 1 edges
10. `DEVELOPMENT WORKFLOW` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (4 total, 1 thin omitted)

### Community 0 - "CLAUDE.md"
Cohesion: 0.18
Nodes (10): AI RESTRICTIONS, CODE QUALITY, DEVELOPMENT WORKFLOW, DOCUMENTATION, GENERAL PRINCIPLES, PLANNING WORKFLOW, PROJECT OVERVIEW, USER APPROVAL (+2 more)

### Community 1 - "MANDATORY AI OPERATING RULES"
Cohesion: 0.50
Nodes (3): 1. READ THIS FILE FIRST, 2. THIS FILE IS IMMUTABLE, MANDATORY AI OPERATING RULES

### Community 3 - "Activity Log"
Cohesion: 0.14
Nodes (13): 2026-10-20 — Hero section layout rebalance (v1), 2026-10-20 — Hero section layout rebalance (v2), 2026-10-20 — Hero section typewriter restored (v3), 2026-10-20 — Right-side role box and blue theme (v4), 2026-11-07 — Add tech stack auto-scrolling marquee banner between hero and works, 2026-11-07 — Default dark mode, side fades, mobile hero layout, 2026-11-07 — Fix broken tech marquee icons and update tool list, 2026-11-07 — Hero header fix, text reposition, works marquee rebuild (+5 more)

## Knowledge Gaps
- **25 isolated node(s):** `1. READ THIS FILE FIRST`, `2. THIS FILE IS IMMUTABLE`, `PROJECT OVERVIEW`, `GENERAL PRINCIPLES`, `Graphify Rules` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 26 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GRAPHIFY` connect `GRAPHIFY` to `CLAUDE.md`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `1. READ THIS FILE FIRST`, `2. THIS FILE IS IMMUTABLE`, `PROJECT OVERVIEW` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Activity Log` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._