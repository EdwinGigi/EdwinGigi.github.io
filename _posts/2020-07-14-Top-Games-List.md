---
layout: default
title:  "My games ranking list"
permalink: /blog/topGames
---

{%- for game in site.data.topGames -%}
    {{ forloop.index }}: {{ game }}
    <br>
{%- endfor -%}