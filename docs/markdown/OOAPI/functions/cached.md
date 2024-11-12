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

[src/OOAPI.Core.ts:806](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/OOAPI.Core.ts#L806)
