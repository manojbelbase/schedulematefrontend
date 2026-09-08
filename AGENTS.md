# AGENTS.md

## Project memory (MemPalace)

This repo has a local-first AI memory palace for development context. It is **not** part of the ScheduleMate AI product — it is a dev-tool that lets agents recall past work in this repo across sessions.

- Access: via the `mempalace` MCP server (`opencode.json`). 36 tools are available.
- Storage: Docker volume `mempalace-data`, palace at `/data/.mempalace` (one local ChromaDB/SQLite store). Nothing leaves the machine.
- Per-project files `mempalace.yaml`, `entities.json` are gitignored (machine-specific).
- Wing: `work` — rooms `apps`, `packages`, `frontend`, `general`.

### Rules for agents

1. **On session start**: call `mempalace_status` to load the palace overview and the Memory Protocol.
2. **Before answering** questions about past work, decisions, or conventions in this repo: call `mempalace_search` first. Never guess.
3. **If unsure** whether prior context exists, query the palace before responding.
4. **At session end**: write a short diary entry with `mempalace_diary_write` recording what was decided, changed, and built.
5. **When facts change** (arch decisions, deps, API): invalidate the old fact (`mempalace_kg_invalidate`) and add the new one (`mempalace_kg_add`).

### Useful MCP tools

| Tool                                              | Purpose                                    |
| ------------------------------------------------- | ------------------------------------------ |
| `mempalace_status`                                | Palace overview + memory protocol          |
| `mempalace_search`                                | Semantic recall of past drawers (verbatim) |
| `mempalace_list_drawers` / `mempalace_get_drawer` | Browse stored content                      |
| `mempalace_diary_write` / `mempalace_diary_read`  | Session diaries                            |
| `mempalace_kg_query` / `mempalace_kg_timeline`    | Entity/relationship knowledge graph        |

### Manual CLI (outside opencode)

```sh
# overview of what's stored
docker run --rm -v mempalace-data:/data ghcr.io/mempalace/mempalace status

# search stored content
docker run --rm -v mempalace-data:/data ghcr.io/mempalace/mempalace search "turborepo setup"

# re-mine the repo after major changes (mounted read-write so per-project files update)
docker run --rm -v mempalace-data:/data -v "Z:\schedulematefrontend:/work" ghcr.io/mempalace/mempalace mine /work
```

Note: `opencode.json` config only loads at opencode startup — restart opencode after editing `opencode.json`.
