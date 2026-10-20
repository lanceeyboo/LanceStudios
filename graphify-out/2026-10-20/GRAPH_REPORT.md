# Graph Report - LanceStudios  (2026-10-20)

## Corpus Check
- 4 files · ~3,309,083 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 22 nodes · 20 edges · 4 communities (3 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aa1fa664`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- CLAUDE.md
- MANDATORY AI OPERATING RULES
- GRAPHIFY
- Activity Log

## God Nodes (most connected - your core abstractions)
1. `Activity Log` - 4 edges
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
Cohesion: 0.40
Nodes (4): 2026-10-20 — Hero section layout rebalance (v1), 2026-10-20 — Hero section layout rebalance (v2), 2026-10-20 — Hero section typewriter restored (v3), Activity Log

## Knowledge Gaps
- **16 isolated node(s):** `1. READ THIS FILE FIRST`, `2. THIS FILE IS IMMUTABLE`, `PROJECT OVERVIEW`, `GENERAL PRINCIPLES`, `Graphify Rules` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 17 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GRAPHIFY` connect `GRAPHIFY` to `CLAUDE.md`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `1. READ THIS FILE FIRST`, `2. THIS FILE IS IMMUTABLE`, `PROJECT OVERVIEW` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._