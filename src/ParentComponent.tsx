import React, { useState } from "react";
import { QueryBuilder, RuleGroupType } from "react-querybuilder";
import CustomFieldSelector from "./CustomBuilder"; // Name now matches your file

const initialQuery: RuleGroupType = {
  combinator: "and",
  rules: [],
};

const ParentComponent = () => {
  const [query, setQuery] = useState<RuleGroupType>(initialQuery);

  return (
    <div>
      <QueryBuilder
        query={query}
        onQueryChange={setQuery}
        fields={[]}
        controlElements={{
          fieldSelector: (props) => <CustomFieldSelector {...props} />, 
        }}
      />
    </div>
  );
};

export default ParentComponent;
