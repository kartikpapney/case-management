// App.tsx
import React, { useState } from "react";
import { QueryBuilder, RuleGroupType, formatQuery } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import CustomFieldSelector from "./CustomBuilder";

const App = () => {
  const [query, setQuery] = useState<RuleGroupType>({
    combinator: "and",
    rules: [],
  });

  return (
    <div style={{ padding: 20 }}>
      <QueryBuilder
        fields={[]} 
        query={query}
        onQueryChange={setQuery}
        controlElements={{ fieldSelector: CustomFieldSelector }}
      />
      <pre style={{ marginTop: 20, background: "#eee", padding: 10 }}>
        <code>{JSON.stringify(formatQuery(query, "jsonlogic"), null, 2)}</code>
      </pre>
    </div>
  );
};

export default App;
