module.exports = {
    plugins: [
        "mocha"
    ],
    env: {
        node: true,
        mocha: true
    },
    extends: "airbnb-base",

    rules: {
        "no-loop-func": "off",
        "no-mixed-operators": "off",
        'no-debugger': "off",
        "no-unused-expressions": "off"
    }
}