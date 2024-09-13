[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / cached

# Function: cached()

> **cached**\<`T`\>(`func`): (`id`) => `Promise`\<`T`\>

A cache helper to cache single functions and their return variable.

## Type Parameters

• **T**

## Parameters

• **func**

The function to cache

## Returns

`Function`

A function which upon subsequent calls with the same id parameter returns the result from the first call.

### Parameters

• **id**: `string`

### Returns

`Promise`\<`T`\>

## Defined in

ooapi/OOAPI.Core.ts:651
