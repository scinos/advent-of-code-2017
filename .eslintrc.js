module.exports = {
    plugins: [
        "mocha",
        "prettier"
    ],
    env: {
        node: true,
        mocha: true
    },
    extends: ["airbnb-base", "prettier"],

    rules: {
        "no-loop-func": "off",
        "no-mixed-operators": "off",
        'no-debugger': "off",
        "no-unused-expressions": "off",
        "no-param-reassign": "off",
        "no-cond-assign": "off",
        "no-continue": "off",
        "no-bitwise": "off",
        "prefer-destructuring": "off",
        "no-return-assign": "off",
        "no-constant-condition": "off",

        "prettier/prettier": "error",

        "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/test.js"]}]
    }
}