[Open Ordial API](../../../../README.md) / [OOAPI](../../../README.md) / [OOMD](../README.md) / Book

# Interface: Book

This interface represents a book, including its optional title, description,
authors, publisher, chapters, ISBN, language, and edition.

## Properties

### title?

> `optional` **title**: `string`

The optional title of the book

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:16

***

### description?

> `optional` **description**: `string`

An optional description of the book

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:20

***

### authors?

> `optional` **authors**: (`string` \| [`Linked`](../type-aliases/Linked.md)\<[`Author`](Author.md)\>)[]

An optional array of linked authors or author names

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:24

***

### publisher?

> `optional` **publisher**: `string` \| [`Linked`](../type-aliases/Linked.md)\<[`Publisher`](Publisher.md)\>

An optional linked publisher or publisher name

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:28

***

### chapters?

> `optional` **chapters**: [`Linked`](../type-aliases/Linked.md)\<[`Chapter`](Chapter.md)\>[]

An optional array of linked chapters, default children

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:32

***

### isbn?

> `optional` **isbn**: `string`

An optional ISBN of the book

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:36

***

### language?

> `optional` **language**: `string`

The optional language of the book

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:40

***

### edition?

> `optional` **edition**: `number`

The optional edition number of the book

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Book.d.ts:44
