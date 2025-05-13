import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryBuilderDnD } from "@react-querybuilder/dnd";
import { QueryBuilder, formatQuery } from "react-querybuilder";
import type { RuleGroupType } from "react-querybuilder";

import { fields } from "./fields";
import "react-querybuilder/dist/query-builder.css";
import "./App.css";

const initialQuery: RuleGroupType = {
    combinator: "and",
    rules: [
        {
            field: "dateRange",
            operator: "=",
            value: "last7days",
        },
        {
            combinator: "or",
            rules: [
                {
                    field: "exceptionId",
                    operator: "=",
                    value: "674ecffd494b6fe12cf73139",
                },
                {
                    field: "exceptionId",
                    operator: "=",
                    value: "674ecfc0494b6fe12cf73118",
                },
            ],
        },
    ],
};

export const Main = () => {
    const [query, setQuery] = useState(initialQuery);

    const formattedRule = JSON.stringify(formatQuery(query, { format: "jsonlogic", parseNumbers: true }), null, 2);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(formattedRule);
            alert("Rule copied to clipboard!");
        } catch (err) {
            alert("Failed to copy rule.");
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <h1>Case Management on Transactions</h1>
            <QueryBuilderDnD>
                <QueryBuilder fields={fields} query={query} onQueryChange={setQuery} />
            </QueryBuilderDnD>

            <h3>Description</h3>
            <pre>
                <code>{JSON.stringify(formatQuery(query, "natural_language"), null, 2)}</code>
            </pre>

            <h3>Rule</h3>
            <pre>
                <code>{formattedRule}</code>
            </pre>

            <button
                onClick={handleCopy}
                style={{
                    backgroundColor: "white",
                    color: "black",
                    display: "inline-block",
                    marginTop: "20px",
                    fontSize: "16px",
                    borderRadius: "2px",
                    borderWidth: "1px",
                    borderColor: "black",
                    borderStyle: "solid",
                    padding: "8px 16px",
                    textDecoration: "none",
                    cursor: "pointer",
                }}
            >
                Copy
            </button>

            <a
                href="https://jsonlogic.com/play.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    backgroundColor: "white",
                    color: "black",
                    display: "inline-block",
                    marginTop: "20px",
                    fontSize: "16px",
                    borderRadius: "2px",
                    borderWidth: "1px",
                    borderColor: "black",
                    borderStyle: "solid",
                    padding: "8px 16px",
                    margin: "5px",
                    textDecoration: "none",
                    cursor: "pointer",
                }}
            >
                Try Rule (Json Logic JS)
            </a>
        </DndProvider>
    );
};
