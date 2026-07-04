# QA — usabilidade, lógica e segurança

Baseline + correções em `fix/qa-p0-findings`.

## Checklist manual

- [ ] Desktop: mover/parar, pular, stomp, moeda, flag, win, gameover, sem barra touch
- [ ] Mobile / DevTools ≤900px: barra visível, hold ←→, pulo, menus por toque **só no texto CTA**
- [ ] Queda no buraco: respawn **sem** perder vida
- [ ] Rotacionar o aparelho: recarrega e layout ok
- [ ] DevTools → Sources: mensagem **não** aparece em texto claro em `config` (só payload ofuscado)

## P0 — Alto impacto

| # | Status | Problema |
|---|--------|----------|
| 1 | Feito | Movimento sem parar (`vel.x = 0`) |
| 2 | Feito | Mensagem ofuscada em base64 (`getBirthdayMessage`) |
| 3 | Feito | CTA só no texto (`addActionHint`), sem `onClick` global |
| 4 | Feito | Queda no buraco só respawna |
| 5 | Feito | Reload em `orientationchange` / resize grande |

## P1 — Médio impacto

| # | Status | Problema |
|---|--------|----------|
| 6 | Feito | `isMobileUi` alinhado ao CSS (`hover: none` + `pointer: coarse`) |
| 7 | Pendente | Multi-touch no `pointerup` global |
| 8 | Pendente | Pause |
| 9 | Feito | Som de stomp próprio |
| 10 | Pendente | AudioContext no primeiro gesto |
| 11 | Pendente | `k.wait` de invencibilidade após trocar cena |
| 12 | Pendente | Mute |
| 13 | Pendente | Flag full-height (mantido de propósito) |

## P2 — Baixo impacto

| # | Status | Problema |
|---|--------|----------|
| 14–15 | Pendente | A11y |
| 16 | Parcial | Acentos nos textos tocados (menu/win/gameover) |
| 17–19 | Pendente | Progresso, deploy, CSP |
