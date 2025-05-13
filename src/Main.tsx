import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryBuilderDnD } from '@react-querybuilder/dnd';
import { QueryBuilder, formatQuery } from 'react-querybuilder';
import type { RuleGroupType } from 'react-querybuilder';

import { fields } from './fields';
import 'react-querybuilder/dist/query-builder.css';
import './App.css';

const initialQuery: RuleGroupType = { combinator: 'and', rules: [] };

export const Main = () => {
  const [query, setQuery] = useState(initialQuery);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <QueryBuilderDnD>
        <QueryBuilder fields={fields} query={query} onQueryChange={setQuery} />
      </QueryBuilderDnD>
      <pre>
        <code>{JSON.stringify(formatQuery(query, {format: 'jsonlogic', parseNumbers: true}), null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(formatQuery(query, 'natural_language'), null, 2)}</code>
      </pre>
    </DndProvider>
  );
};