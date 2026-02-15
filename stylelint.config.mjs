const config = {
  extends: ["stylelint-config-standard", "stylelint-config-standard-scss"],
  plugins: ["stylelint-max-lines"],
  rules: {
    "no-descending-specificity": null,
    "selector-class-pattern": null,
    "alpha-value-notation": "number",
    "color-function-notation": null,
    "scss/at-rule-no-unknown": true,
    "scss/comment-no-empty": null,
    "custom-property-pattern": null,
    "keyframes-name-pattern": null,
    "declaration-block-no-shorthand-property-overrides": null,
    "block-no-empty": null,
    "number-max-precision": null,
    "pitcher/max-lines": 500,
  },
};

export default config;
