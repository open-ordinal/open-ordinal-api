[Open Ordial API](../../../../README.md) / [OOAPI](../../../README.md) / [OOMD](../README.md) / Book

# Interface: Book

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:12

This interface represents a book, including its optional title, description,
authors, publisher, chapters, ISBN, language, and edition.

## Properties

### title?

> `optional` **title**: `string`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:16

The optional title of the book

***

### description?

> `optional` **description**: `string`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:20

An optional description of the book

***

### authors?

> `optional` **authors**: (`string` \| [`Linked`](../type-aliases/Linked.md)\<[`Author`](Author.md)\>)[]

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:24

An optional array of linked authors or author names

***

### publisher?

> `optional` **publisher**: `string` \| [`Linked`](../type-aliases/Linked.md)\<[`Publisher`](Publisher.md)\>

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:28

An optional linked publisher or publisher name

***

### chapters?

> `optional` **chapters**: [`Linked`](../type-aliases/Linked.md)\<[`Chapter`](Chapter.md)\>[]

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:32

An optional array of linked chapters, default children

***

### isbn?

> `optional` **isbn**: `string`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:36

An optional ISBN of the book

***

### language?

> `optional` **language**: `string`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:40

The optional language of the book

***

### edition?

> `optional` **edition**: `number`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:44

The optional edition number of the book
