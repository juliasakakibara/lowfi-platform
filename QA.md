# QA — usabilidade, lógica e segurança

Baseline: branch `test/qa-usability-security` (cleanup + fix de movimento).  
Não implementar melhorias nesta branch — abrir PRs separados por item.

## Checklist manual

- [ ] Desktop: mover/parar, pular, stomp, moeda, flag, win, gameover, sem barra touch
- [ ] Mobile / DevTools ≤900px: barra visível, hold ←→, pulo, menus por toque (e mis-tap)
- [ ] Queda no buraco: vidas e respawn
- [ ] Rotacionar o aparelho: anotar se quebra
- [ ] DevTools → Sources: mensagem de aniversário visível no JS?

## P0 — Alto impacto

| # | Área | Problema | Impacto |
|---|------|----------|---------|
| 1 | Lógica / UX | Movimento sem parar se `vel.x` não for zerado (**corrigido** no baseline) | Jogo injogável no teclado |
| 2 | Segurança / spoiler | Mensagem de aniversário em `src/config.js` vai no bundle público | Quebra a surpresa |
| 3 | Usabilidade | `k.onClick` no menu / win / gameover — qualquer toque avança a cena | Saída/início acidental |
| 4 | Lógica | Queda no buraco chama `handlePlayerHit` (perde vida + respawn) | Frustração |
| 5 | Lógica / mobile | `GAME.height` só no boot — rotacionar a tela não recalcula | Layout errado até reload |

## P1 — Médio impacto

| # | Área | Problema | Impacto |
|---|------|----------|---------|
| 6 | Lógica | CSS da barra touch vs `isMobileUi()` podem divergir | Layout em tablets |
| 7 | Touch | `pointerup` global zera left/right (multi-touch) | Glitch raro |
| 8 | Usabilidade | Sem pause | Perde a run ao sair |
| 9 | Usabilidade | Stomp usa som de moeda | Feedback confuso |
| 10 | Usabilidade | AudioContext pode iniciar mudo sem gesto | 1º som falha |
| 11 | Lógica | `k.wait` de invencibilidade após trocar de cena | Edge case |
| 12 | Usabilidade | Sem mute | Preferência |
| 13 | Lógica | Flag full-height pode vencer sem “tocar” a bandeira | Vitória estranha |

## P2 — Baixo impacto

| # | Área | Problema | Impacto |
|---|------|----------|---------|
| 14 | A11y | Canvas sem alternativa textual | Leitores de tela |
| 15 | A11y | Sem `prefers-reduced-motion` | Movimento |
| 16 | Usabilidade | Textos sem acento | Acabamento PT |
| 17 | UX | Sem indicação de progresso no nível | Orientação |
| 18 | Deploy | Pages exige rebuild manual de `docs/` | Operacional |
| 19 | Segurança | Sem CSP (limitação do Pages) | Risco baixo |

## Segurança (contexto)

App estático, sem backend. Risco relevante: **spoiler da mensagem (#2)**. Demais vetores clássicos (XSS de formulário, auth, etc.) não se aplicam.
