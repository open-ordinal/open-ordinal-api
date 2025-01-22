[Open Ordial API](../../../../README.md) / [OOAPI](../../../README.md) / [OOMD](../README.md) / Chapter

# Interface: Chapter

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Chapter.d.ts:8

This interface represents a chapter, including its optional title, description,
and an optional array of linked sub-chapters.

## Properties

### title?

> `optional` **title**: `string`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Chapter.d.ts:12

The optional title of the chapter

***

### description?

> `optional` **description**: `string`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Chapter.d.ts:16

An optional description of the chapter

***

### chapters?

> `optional` **chapters**: [`Linked`](../type-aliases/Linked.md)\<[`Chapter`](Chapter.md)\>[]

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Chapter.d.ts:20

An optional array of linked sub-chapters
