[Open Ordial API](../../README.md) / [OOMD](../README.md) / Metadata

# Interface: Metadata

## Mermaid

#### OOMD Structure

<div class="mermaid-block"><div class="mermaid dark">%%{init:{"theme":"dark"}}%%
graph LR
  OOMD --&gt; Organization
  OOMD --&gt; Collection
  Collection --&gt; Attributes
  OOMD --&gt; Attributes
  OOMD --&gt; Artist
  Artist --&gt; Release
  Release --&gt; Track
  OOMD --&gt; Media
  OOMD --&gt; Author
  Author --&gt; Book
  Book --&gt; Chapter
  OOMD --&gt; Module</div><div class="mermaid light">%%{init:{"theme":"default"}}%%
graph LR
  OOMD --&gt; Organization
  OOMD --&gt; Collection
  Collection --&gt; Attributes
  OOMD --&gt; Attributes
  OOMD --&gt; Artist
  Artist --&gt; Release
  Release --&gt; Track
  OOMD --&gt; Media
  OOMD --&gt; Author
  Author --&gt; Book
  Book --&gt; Chapter
  OOMD --&gt; Module</div><pre><code class="language-mermaid">graph LR
  OOMD --&gt; Organization
  OOMD --&gt; Collection
  Collection --&gt; Attributes
  OOMD --&gt; Attributes
  OOMD --&gt; Artist
  Artist --&gt; Release
  Release --&gt; Track
  OOMD --&gt; Media
  OOMD --&gt; Author
  Author --&gt; Book
  Book --&gt; Chapter
  OOMD --&gt; Module</code></pre></div>

## Extends

- [`Common`](Common.md)

## Properties

### artist?

> `optional` **artist**: [`Artist`](Artist.md)

#### Defined in

oomd/OOMD.ts:63

***

### attributes?

> `optional` **attributes**: [`Attributes`](Attributes.md)

#### Defined in

oomd/OOMD.ts:61

***

### author?

> `optional` **author**: [`Author`](Author.md)

#### Defined in

oomd/OOMD.ts:70

***

### book?

> `optional` **book**: [`Book`](Book.md)

#### Defined in

oomd/OOMD.ts:71

***

### chapter?

> `optional` **chapter**: [`Chapter`](Chapter.md)

#### Defined in

oomd/OOMD.ts:72

***

### collection?

> `optional` **collection**: [`Collection`](Collection.md)

#### Defined in

oomd/OOMD.ts:60

***

### id?

> `optional` **id**: `string`

#### Inherited from

[`Common`](Common.md).[`id`](Common.md#id)

#### Defined in

oomd/protocols/Common.ts:6

***

### media?

> `optional` **media**: [`Media`](Media.md)

#### Defined in

oomd/OOMD.ts:67

***

### module?

> `optional` **module**: [`Module`](Module.md)

#### Defined in

oomd/OOMD.ts:68

***

### organization?

> `optional` **organization**: [`Organization`](Organization.md)

#### Defined in

oomd/OOMD.ts:58

***

### release?

> `optional` **release**: [`Release`](Release.md)

#### Defined in

oomd/OOMD.ts:64

***

### static?

> `optional` **static**: `true`

#### Defined in

oomd/OOMD.ts:56

***

### track?

> `optional` **track**: [`Track`](Track.md)

#### Defined in

oomd/OOMD.ts:65
<style>
:root.mermaid-enabled .mermaid-block > pre {
  display: none;
}
:root:not(.mermaid-enabled) .mermaid-block > .mermaid {
  display: none !important;
}

.mermaid-block > .mermaid[data-inserted].dark {
  display: var(--mermaid-dark-display);
}
.mermaid-block > .mermaid[data-inserted].light {
  display: var(--mermaid-light-display);
}

:root {
  --mermaid-dark-display: none;
  --mermaid-light-display: block;
}
@media (prefers-color-scheme: light) {
  :root {
    --mermaid-dark-display: none;
    --mermaid-light-display: block;
  }
}
@media (prefers-color-scheme: dark) {
  :root {
    --mermaid-dark-display: block;
    --mermaid-light-display: none;
  }
}
body.light, :root[data-theme="light"] {
  --mermaid-dark-display: none;
  --mermaid-light-display: block;
}
body.dark, :root[data-theme="dark"] {
  --mermaid-dark-display: block;
  --mermaid-light-display: none;
}
</style>

<script type="module">
import mermaid from "https://unpkg.com/mermaid@latest/dist/mermaid.esm.min.mjs";

document.documentElement.classList.add("mermaid-enabled");

mermaid.initialize({startOnLoad:true});

requestAnimationFrame(function check() {
  let some = false;
  document.querySelectorAll("div.mermaid:not([data-inserted])").forEach(div => {
    some = true;
    if (div.querySelector("svg")) {
      div.dataset.inserted = true;
    }
  });

  if (some) {
    requestAnimationFrame(check);
  }
});
</script>

