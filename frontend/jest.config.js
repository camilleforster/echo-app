module.exports = {
  preset: "jest-expo",
  transform: {
    "\\.ts$": "ts-jest",
    "\\.tsx$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/frontend/**/?(*.)+(spec|test).[tj]s?(x)"],
};
