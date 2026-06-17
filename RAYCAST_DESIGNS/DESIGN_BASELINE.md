# RAYCAST / LINEAR DESIGN BASELINE

## Purpose

This folder is the visual and interaction baseline for SwasthYatra's frontend rebuild.

It should not be copied literally. Extract principles:

- Raycast = Product UI system
- Linear = UX architecture and information density
- Tsenta = Narrative progression
- Cursor = Agent experience
- Stripe = Trust and documentation quality
- Airtable = Operational workflows

## Non-negotiable product language

Do not expose implementation internals on user-facing surfaces.

Avoid:

- AI Assistant
- AI Agent
- Agent Runtime
- Healthcare Graph
- Outcome Engine
- Provider Ranking Engine
- Tool Calls
- Planner / Executor / Reflection

Use:

- Navigation Assistant
- Healthcare Navigation Network
- Provider Network
- Care Outcomes
- Activity
- Journey
- Recommended Care Options
- Care Coordination

## UI system

- Background: `#07080A`
- Primary surfaces: `#0D1015`, `#11151C`, `#151A22`
- Borders: `rgba(255,255,255,0.08)`
- Hover borders: `rgba(255,255,255,0.15)`
- Text primary: `rgba(255,255,255,0.95)`
- Text secondary: `rgba(255,255,255,0.65)`
- Text muted: `rgba(255,255,255,0.45)`
- Accent: `#00E5FF`

## Motion doctrine

Motion must communicate progress, hierarchy, or state.

- Micro: 80-120ms
- Structural: 180-250ms
- Navigation: 250-350ms
- Narrative: 500-700ms

## Demo animation cards

Use sequential narrative cards for the demo journey:

1. Assessment Complete
2. Recommended Care Options
3. Provider Contacted
4. Communication Ready
5. Care Completed

Each card should reveal progressively and explain the outcome, not the internals.
