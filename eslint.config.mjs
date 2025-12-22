import nextConfig from "eslint-config-next";

const eslintConfig = [
    {
        ignores: [".next/**", "node_modules/**", "out/**", "coverage/**"],
    },
    ...nextConfig,
    {
        rules: {
            "react/no-unescaped-entities": 0,
            "@next/next/no-img-element": "off",
            "@next/next/no-css-tags": "off", // Vendor CSS from public/ must use link tags
        },
    },
];

export default eslintConfig;
