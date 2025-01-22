[Open Ordial API](../../../../README.md) / [OOAPI](../../../README.md) / [OOMD](../README.md) / Metadata

# Interface: Metadata

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:66

This interface represents metadata, extending the Common interface, and includes
optional properties for static indication, organization, collection, attributes,
artist, release, track, media, module, author, book, chapter, bootstrap
and torrent.

## Mermaid

#### Metadata Structure

<div class="mermaid-block"><div class="mermaid dark">%%{init:{"theme":"dark"}}%%
graph LR
  Metadata --&gt; Organization
  Metadata --&gt; Collection
  Collection --&gt; Attributes
  Metadata --&gt; Attributes
  Metadata --&gt; Artist
  Artist --&gt; Release
  Release --&gt; Track
  Metadata --&gt; Media
  Metadata --&gt; Author
  Author --&gt; Book
  Book --&gt; Chapter
  Metadata --&gt; Module
  Metadata --&gt; Bootstrap
  Metadata --&gt; Torrent
  Metadata --&gt; Publisher</div><div class="mermaid light">%%{init:{"theme":"default"}}%%
graph LR
  Metadata --&gt; Organization
  Metadata --&gt; Collection
  Collection --&gt; Attributes
  Metadata --&gt; Attributes
  Metadata --&gt; Artist
  Artist --&gt; Release
  Release --&gt; Track
  Metadata --&gt; Media
  Metadata --&gt; Author
  Author --&gt; Book
  Book --&gt; Chapter
  Metadata --&gt; Module
  Metadata --&gt; Bootstrap
  Metadata --&gt; Torrent
  Metadata --&gt; Publisher</div><pre><code class="language-mermaid">graph LR
  Metadata --&gt; Organization
  Metadata --&gt; Collection
  Collection --&gt; Attributes
  Metadata --&gt; Attributes
  Metadata --&gt; Artist
  Artist --&gt; Release
  Release --&gt; Track
  Metadata --&gt; Media
  Metadata --&gt; Author
  Author --&gt; Book
  Book --&gt; Chapter
  Metadata --&gt; Module
  Metadata --&gt; Bootstrap
  Metadata --&gt; Torrent
  Metadata --&gt; Publisher</code></pre></div>

## Extends

- [`Common`](Common.md)

## Indexable

\[`_`: `string`\]: `any`

## Properties

### static?

> `optional` **static**: `true`

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:71

When `static` is present this indicates that a viewer should _not_ get the
latest inscription on the sat number of this inscription

***

### bootstrap?

> `optional` **bootstrap**: [`Bootstrap`](Bootstrap.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:75

An optional bootstrap options with the metadata

***

### organization?

> `optional` **organization**: [`Organization`](Organization.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:79

An optional organization associated with the metadata

***

### collection?

> `optional` **collection**: [`Collection`](Collection.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:83

An optional collection associated with the metadata

***

### attributes?

> `optional` **attributes**: [`Attributes`](Attributes.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:87

Optional attributes associated with the metadata

***

### artist?

> `optional` **artist**: [`Artist`](Artist.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:91

An optional artist associated with the metadata

***

### release?

> `optional` **release**: [`Release`](Release.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:95

An optional release associated with the metadata

***

### track?

> `optional` **track**: [`Track`](Track.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:99

An optional track associated with the metadata

***

### media?

> `optional` **media**: [`Media`](Media.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:103

Optional media associated with the metadata

***

### module?

> `optional` **module**: [`Module`](Module.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:107

An optional module associated with the metadata

***

### publisher?

> `optional` **publisher**: [`Publisher`](Publisher.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:111

An optional publisher associated with the metadata

***

### author?

> `optional` **author**: [`Author`](Author.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:115

An optional author associated with the metadata

***

### book?

> `optional` **book**: [`Book`](Book.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:119

An optional book associated with the metadata

***

### chapter?

> `optional` **chapter**: [`Chapter`](Chapter.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:123

An optional chapter associated with the metadata

***

### torrent?

> `optional` **torrent**: [`Torrent`](Torrent.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/OOMD.d.ts:127

An optional torrent associated with the metadata

***

### id?

> `optional` **id**: `string`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Common.d.ts:11

An optional ID for the common structure

#### Inherited from

[`Common`](Common.md).[`id`](Common.md#id)
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

