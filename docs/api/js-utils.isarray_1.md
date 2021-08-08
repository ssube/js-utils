<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@apextoaster/js-utils](./js-utils.md) &gt; [isArray](./js-utils.isarray_1.md)

## isArray() function

Wrapper for `Array.isArray` with better readonly type handling.

<b>Signature:</b>

```typescript
export declare function isArray<TVal>(list: TVal | ReadonlyArray<TVal>): list is ReadonlyArray<TVal>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  list | TVal \| ReadonlyArray&lt;TVal&gt; |  |

<b>Returns:</b>

list is ReadonlyArray&lt;TVal&gt;
