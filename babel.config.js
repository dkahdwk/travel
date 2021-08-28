module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        "root": ["./"],
        "alias": {
          "@root": "./",
          "@components": "./components",
          "@screens": "./screens",
          "@hooks": "./hooks",
          "@assets": "./assets",
          "@constants": "./constants",
          "@localization": "./Localization",
          "@store": "./store",
          "@util": "./utils",
          "@lib": "./lib",
        }
      },
    ],
  ],
};
