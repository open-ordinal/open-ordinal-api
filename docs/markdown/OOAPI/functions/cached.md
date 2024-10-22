[Open Ordial API](../../README.md) / [OOAPI](../README.md) / cached

# Function: cached()

> **cached**\<`T`\>(`func`): (`id`) => `Promise`\<`T`\>

A cache helper to cache single functions and their return variable.

## Type Parameters

• **T**

## Parameters

• **func**

The function to cache.

## Returns

`Function`

- A function which upon subsequent calls with the same id parameter returns the result from the first call.

### Parameters

• **id**: `string`

### Returns

`Promise`\<`T`\>

## Defined in

[src/OOAPI.Core.ts:805](https://github.com/open-ordinal/open-ordinal-api/blob/853cbf2a017c45362e48e478b4771550a39cd1c4/src/OOAPI.Core.ts#L805)
