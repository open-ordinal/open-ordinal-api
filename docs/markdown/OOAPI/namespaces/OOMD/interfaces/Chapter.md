[Open Ordial API](../../../../README.md) / [OOAPI](../../../README.md) / [OOMD](../README.md) / Chapter

# Interface: Chapter

This interface represents a chapter, including its optional title, description,
and an optional array of linked sub-chapters.

## Properties

### title?

> `optional` **title**: `string`

The optional title of the chapter

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Chapter.d.ts:12

***

### description?

> `optional` **description**: `string`

An optional description of the chapter

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Chapter.d.ts:16

***

### chapters?

> `optional` **chapters**: [`Linked`](../type-aliases/Linked.md)\<[`Chapter`](Chapter.md)\>[]

An optional array of linked sub-chapters

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Chapter.d.ts:20
