import type { Field, OptionGroup } from "react-querybuilder";
import { defaultOperators } from "react-querybuilder";

// Group exceptions by category
const categorizedExceptions: OptionGroup[] = [
    {
        label: "Transaction Operations",
        options: [
            { name: "674ecffd494b6fe12cf73139", label: "Donation Transaction" },
            { name: "674ecfc0494b6fe12cf73118", label: "CMN Transaction" },
            { name: "674ecfc5494b6fe12cf7311d", label: "Small Transaction" },
        ],
    },
    {
        label: "Item Management",
        options: [
            { name: "674ecfa2494b6fe12cf730f8", label: "Item Deleted (DriveThru)" },
            { name: "674ecfee494b6fe12cf73129", label: "Item Deleted (Non-DriveThru)" },
            { name: "674ecfb3494b6fe12cf73108", label: "Item Voided" },
            { name: "674ecff3494b6fe12cf7312f", label: "Replacement Meal" },
        ],
    },
    {
        label: "Discount and Coupons",
        options: [
            { name: "674ecfae494b6fe12cf73100", label: "BMG (Plastic) with Coupon" },
            { name: "674ecf93494b6fe12cf730f3", label: "Multiple Discounts" },
            { name: "674ecff8494b6fe12cf73134", label: "Be My Guest Card" },
        ],
    },
];
const mappedMathOperator: Record<string, string> = {
    "=": "equals",
    ">": "greater than",
    "<": "less than",
    "!=": "not equal",
    ">=": "greater than or equal to",
    "<=": "less than or equal to",
};
// Common filter operators for percentage fields
const percentageOperators = defaultOperators
    .filter((op) => ["=", ">", "<", "!=", ">=", "<="].includes(op.name))
    .map((op) => {
        if (["=", ">", "<", "!=", ">=", "<="].includes(op.name)) {
            return {
                ...op,
                label: mappedMathOperator[op.name] ?? op.label,
            };
        }
        return op;
    });

export const fields: Field[] = [
    // Date Range field
    {
        name: "dateRange",
        label: "Date Range",
        valueEditorType: "select",
        operators: defaultOperators.filter((op) => op.name === "=").map((op) => {
                return { ...op, label: "is" };
            }),
        values: [
            { name: "today", label: "today" },
            { name: "last7days", label: "last 7 days" },
            { name: "last30days", label: "last 30 days" },
        ],
        defaultValue: "last7days",
        className: "date-field",
    },
    {
        name: "exceptionId",
        label: "Exception",
        operators: defaultOperators
            .filter((op) => op.name === "=")
            .map((op) => {
                return { ...op, label: "is" };
            }),
        valueEditorType: "select",
        values: categorizedExceptions,
        className: "exception-field",
    },
    {
        name: "percentCountOfTotal",
        label: "Count % of Total",
        operators: percentageOperators,
        valueEditorType: "text",
        inputType: "number",
        className: "metrics-field",
    },
    {
        name: "percentRevenueOfTotal",
        label: "Revenue % of Total",
        operators: percentageOperators,
        valueEditorType: "text",
        inputType: "number",
        className: "metrics-field",
    },
];

// Add field grouping configuration
export const fieldGroups = [
    { id: "date", label: "Date Range", fields: ["dateRange", "customDateStart", "customDateEnd"] },
    { id: "exceptions", label: "Exceptions", fields: ["exceptionId"] },
    { id: "metrics", label: "Metrics", fields: ["percentCountOfTotal", "percentRevenueOfTotal", "last"] },
];

export interface RuleType {
    field: string;
    operator: string;
    value: string | string[];
}

export interface QueryType {
    combinator: "and" | "or";
    rules: (RuleType | QueryType)[];
}
