<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@apextoaster/js-utils](./js-utils.md) &gt; [pushMergeMap](./js-utils.pushmergemap_1.md)

## pushMergeMap() function

Merge the provided maps into a new map, merging keys that already exist by pushing new items.

<b>Signature:</b>

```typescript
export declare function pushMergeMap<TKey, TVal>(...args: ReadonlyArray<Map<TKey, TVal | ReadonlyArray<TVal>>>): Map<TKey, ReadonlyArray<TVal>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  args | ReadonlyArray&lt;Map&lt;TKey, TVal \| ReadonlyArray&lt;TVal&gt;&gt;&gt; |  |

<b>Returns:</b>

Map&lt;TKey, ReadonlyArray&lt;TVal&gt;&gt;

