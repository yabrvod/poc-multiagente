# PoC multiagente

Repositorio de partida para el PoC descrito en
[Implementar un PoC multiagente](https://www.yabd.cl/blog/poc-multiagente/).

Solo trae la app que se migra, en [`original/`](original/): páginas armadas en el servidor con
Node.js, Express y plantillas EJS. Todo lo demás (la estructura del proyecto, los agentes de
Claude Code, las fichas, las specs de Playwright y el plan) lo genera el **Analista** en la fase 0,
y la app nueva en Angular la construyen los agentes en la fase 1, dentro de `nuevo/`.

Para empezar, sigue la guía desde la fase 0.
