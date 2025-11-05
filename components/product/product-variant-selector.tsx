"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils";
import type { ProductVariant } from "@/types/product";

function buildOptionsFromVariants(variants:ProductVariant[]) {
  const opts:Record<string, Set<string>> = {}; // { color: Set(...), size: Set(...) }

  for (const v of variants) {
    const attrs: Record<string, string> = v.attributes || {};
    for (const [k, val] of Object.entries(attrs)) {
      if (!opts[k]) opts[k] = new Set();
      if (val != null) opts[k].add(String(val));
    }
  }

  // convert Sets -> arrays (sorted if you want)
  const result = Object.fromEntries(
    Object.entries(opts).map(([k, set]) => [k, Array.from(set)])
  );
  return result;
}

interface ProductVariantSelectorProps {
    variants: ProductVariant[];
    onSelect?: (variant:ProductVariant)=>void
}

export function ProductVariantSelector({
    variants,
    onSelect
}: ProductVariantSelectorProps) {

    const options = useMemo(()=> buildOptionsFromVariants(variants), [variants])

    const attributeNames = useMemo(() => Object.keys(options), [options]);

    const [selected, setSelected] = useState<Record<string, string>>({});

    // const matchingVariant = useMemo(() => {
    //     // only when every attribute has a selection
    //     if (attributeNames.some(name => !selected[name])) return null;

    //     return variants.find(v => {
    //       const attrs = v.attributes || {};
    //       return attributeNames.every(name => String(attrs[name]) === String(selected[name]));
    //     }) || null;
    // }, [variants, selected, attributeNames]);

    const available = useMemo(() => {
        // for each attribute name, produce a set of values that still have at least one variant
        const result:Record<string, Set<string>> = {};
        for (const name of attributeNames) {
          result[name] = new Set();
        }

        for (const v of variants) {
          const attrs = v.attributes || {};
          // check if variant is compatible with current selection (ignore the attribute we are computing)
          let compatible = true;
          for (const [selName, selValue] of Object.entries(selected)) {
            if (!selValue) continue;
            // when checking availability for attribute A, ignore A's selected value
            // we'll still add all values for A from compatible variants
            if (attrs[selName] == null) { compatible = false; break; }
            if (String(attrs[selName]) !== String(selValue)) { compatible = false; break; }
          }
          if (!compatible) continue;
          for (const name of attributeNames) {
            if (attrs[name] != null) result[name].add(String(attrs[name]));
          }
        }

        return Object.fromEntries(Object.entries(result).map(([k, s]) => [k, Array.from(s)]));
    }, [variants, selected, attributeNames]);

    function handleSelect(attrName:string, value:string) {
        setSelected(prev => {
          const next:Record<string, string> = { ...prev, [attrName]: value };
          // if picking a value makes previously selected incompatible, you could clear those:
          for (const name of attributeNames) {
            if (!next[name]) continue;
            // if the combination with new value has no variant, clear dependent selections
            const exists = variants.some(v => {
              const attrs = v.attributes || {};
              return Object.entries(next).every(([k, val]) => !val || String(attrs[k]) === String(val));
            });
            if (!exists) {
              // clear that attribute (except the one we just set)
              if (name !== attrName) delete next[name];
            }
          }

          const fullMatch = variants.find(v => {
          const attrs = v.attributes || {};
          return Object.entries(next).every(
            ([k, val]) => String(attrs[k]) === String(val)
          );
        }) || null;

        if (fullMatch) {
            onSelect?.(fullMatch)
        }

        return next;
        });
    }

    const attributeGroups = variants.reduce(
        (groups, variant) => {
            if (!variant.attributes) return groups;

            Object.entries(variant.attributes).forEach(([key, value]) => {
                if (!groups[key]) groups[key] = new Set();
                groups[key].add(value);
            });

            return groups;
        },
        {} as Record<string, Set<string>>,
    );

    return (
        <div className="space-y-4">
            {
                attributeNames.map(name => (
                    <div key={name} className="space-y-2">
                        <h4 className="font-medium capitalize">{name}</h4>
                        <div className="flex flex-wrap gap-2">
                            {
                                options[name].map(opt =>{
                                    const isAvailable = (available[name] || []).includes(String(opt));
                                    const isSelected = selected[name] === opt;

                                    return (
                                        <Button
                                            key={opt}
                                            variant={isSelected ? "default" : "outline"}
                                            size="sm"
                                            // disabled={!isAvailable}
                                            onClick={() => handleSelect(name, opt)}
                                            className={cn("relative", !isAvailable && "opacity-50")}
                                        >
                                            {opt}
                                            {/* {!isAvailable && (
                                                <Badge
                                                    variant="destructive"
                                                    className="absolute -top-2 -right-2 text-xs px-1"
                                                >
                                                    Out
                                                </Badge>
                                            )} */}
                                        </Button>
                                    )
                                })
                            }
                            {/* {Array.from(values).map((value) => {
                                const variant = variants.find(
                                    (v) => v.attributes?.[attributeName] === value,
                                );
                                const isSelected = selectedVariant === variant?.id;
                                const isInStock = variant?.isInStock ?? false;

                                return (
                                    <Button
                                        key={value}
                                        variant={isSelected ? "default" : "outline"}
                                        size="sm"
                                        disabled={!isInStock}
                                        onClick={() => variant && setSelectedVariant(variant.id)}
                                        className={cn("relative", !isInStock && "opacity-50")}
                                    >
                                        {value}
                                        {!isInStock && (
                                            <Badge
                                                variant="destructive"
                                                className="absolute -top-2 -right-2 text-xs px-1"
                                            >
                                                Out
                                            </Badge>
                                        )}
                                    </Button>
                                );
                            })} */}
                        </div>
                    </div>
                ))
            }
            {/* {Object.entries(attributeGroups).map(([attributeName, values]) => (
                <div key={attributeName} className="space-y-2">
                    <h4 className="font-medium capitalize">{attributeName}</h4>
                    <div className="flex flex-wrap gap-2">
                        {Array.from(values).map((value) => {
                            const variant = variants.find(
                                (v) => v.attributes?.[attributeName] === value,
                            );
                            const isSelected = selectedVariant === variant?.id;
                            const isInStock = variant?.isInStock ?? false;

                            return (
                                <Button
                                    key={value}
                                    variant={isSelected ? "default" : "outline"}
                                    size="sm"
                                    disabled={!isInStock}
                                    onClick={() => variant && setSelectedVariant(variant.id)}
                                    className={cn("relative", !isInStock && "opacity-50")}
                                >
                                    {value}
                                    {!isInStock && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute -top-2 -right-2 text-xs px-1"
                                        >
                                            Out
                                        </Badge>
                                    )}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            ))} */}
        </div>
    );
}
