module.exports = function (w) {
  process.env.TEST_ENV = "wallaby";

    return {
      env: {
          type: "node",
          runner: "node",
      },
      files: [
        'src/index.ts',
        'src/LinkedList.ts',
      ],
      testFramework: "jest",
  
      tests: [
        'src/*.spec.ts'
      ]
    };
  };
  