// CustomFieldSelector.tsx
import React, { useEffect, useState } from "react";
import { FieldSelectorProps } from "react-querybuilder";

type LeafOption = {
  key: string;
  label: string;
};

type NestedFields = {
  [key: string]: NestedFields | LeafOption[];
};

const nestedFields: NestedFields = {
  order: [
    { key: "refund", label: "Refund" },
    { key: "discount", label: "Discount" },
    { key: "avgOrderValue", label: "Avg Order Value" },
  ],
  attendence: [{ key: "count", label: "Count" }],
  exception: {
    "67610796db77870cce5a54b6": [
      { key: "count", label: "Count" },
      { key: "revenue", label: "Revenue" },
      { key: "percentCount", label: "Percent Count" },
      { key: "percentRevenue", label: "Percent Revenue" },
    ],
  },
};

const exceptionLabels: Record<string, string> = {
  "67610796db77870cce5a54b6": "Item Voided",
};

function isLeafArray(node: any): node is LeafOption[] {
  return Array.isArray(node) && node.length > 0 && "key" in node[0] && "label" in node[0];
}

const CustomFieldSelector: React.FC<FieldSelectorProps> = ({ className, handleOnChange, value }) => {
  const fixedRoot = "employee";
  const [selectedParts, setSelectedParts] = useState<string[]>(
    value?.split(".").slice(1) || [] // skip fixed root
  );

  useEffect(() => {
    if (selectedParts.length > 0) {
      handleOnChange([fixedRoot, ...selectedParts].join("."));
    } else {
      handleOnChange(fixedRoot);
    }
  }, [selectedParts, handleOnChange]);

  function getNestedNode(path: string[]): NestedFields | LeafOption[] | null {
    let node: any = nestedFields;
    for (const key of path) {
      if (!node) return null;
      node = node[key];
    }
    return node || null;
  }

  function getLabel(level: number, key: string): string {
    if (selectedParts[0] === "exception" && level === 1) {
      return exceptionLabels[key] || key;
    }
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  const selects = [];
  let currentPath: string[] = [];

  for (let level = 0; ; level++) {
    const node = getNestedNode(currentPath);
    if (!node) break;

    let options: LeafOption[] | string[] = [];

    if (isLeafArray(node)) {
      options = node;
    } else {
      options = Object.keys(node);
    }

    if (options.length === 0) break;

    const selectedValue = selectedParts[level] || "";

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      setSelectedParts((prev) => [...prev.slice(0, level), val]);
    };

    selects.push(
      <select
        key={level}
        value={selectedValue}
        onChange={onChange}
        disabled={options.length === 0}
        style={{ minWidth: 120 }}
      >
        <option value="">{`Select ${level === 0 ? "Subgroup" : "Field"}`}</option>
        {isLeafArray(node)
          ? options.map(({ key, label }: any) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))
          : (options as string[]).map((opt) => (
              <option key={opt} value={opt}>
                {getLabel(level, opt)}
              </option>
            ))}
      </select>
    );

    if (!selectedValue || isLeafArray(node)) break;

    currentPath.push(selectedValue);
  }

  return (
    <div className={className} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <span
        style={{
          minWidth: 100,
          lineHeight: "32px",
          fontWeight: "bold",
        }}
      >
        {fixedRoot}
      </span>
      {selects}
    </div>
  );
};

export default CustomFieldSelector;
