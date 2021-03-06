<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@apextoaster/js-utils](./js-utils.md) &gt; [mergeMap](./js-utils.mergemap.md)

## mergeMap() function

Merge the `source` map into the `target` map, replacing keys that already exist.

<b>Signature:</b>

```typescript
export declare function mergeMap<TKey, TVal>(target: Map<TKey, TVal>, source: Map<TKey, TVal> | ReadonlyArray<[TKey, TVal]>): Map<TKey, TVal>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  target | Map&lt;TKey, TVal&gt; |  |
|  source | Map&lt;TKey, TVal&gt; \| ReadonlyArray&lt;\[TKey, TVal\]&gt; |  |

<b>Returns:</b>

Map&lt;TKey, TVal&gt;

