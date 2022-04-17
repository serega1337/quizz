module.exports = {
    presets: [
        "@babel/preset-env",
        ["@babel/preset-react", {runtime: "automatic"}]
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        process.env.NODE_ENV !== "production" && "react-refresh/babel"
    ].filter(Boolean)
}
