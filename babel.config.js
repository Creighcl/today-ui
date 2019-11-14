module.exports = {
  "plugins": ["@babel/plugin-proposal-object-rest-spread"],
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        "modules": process.env.NODE_ENV === 'test' ? 'auto' : 'false',
        "targets": {
          "node": "current",
        },
      },
    ],
  ],
};
