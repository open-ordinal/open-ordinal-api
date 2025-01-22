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

[src/OOAPI.Core.ts:784](https://github.com/open-ordinal/open-ordinal-api/blob/3bda30e010ce0a6e33466519d113a28c8fe2684b/src/OOAPI.Core.ts#L784)
