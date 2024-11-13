## System Requirements

- Node JS version 22.x https://nodejs.org/en/download/
- Visual Code https://code.visualstudio.com/download

###

Project is using the npm library [@testla/screenplay](https://www.npmjs.com/package/@testla/screenplay).
In this page you will find all your references needed on how to use the library.

## The Screenplay pattern

The Screenplay Pattern is a user-centred approach to writing high-quality automated tests. It steers you towards an effective use of layers of abstraction, helps your tests capture the business vernacular, and encourages good testing and software engineering habits.

Instead of focusing on low-level, interface-centric interactions, you describe your test scenarios in a similar way you'd describe them to a human being - an actor in Screenplay-speak. You write simple, readable and highly-reusable code that instructs the actors what activities to perform and what things to check. The domain-specific test language you create is used to express screenplays - the activities for the actors to perform in a given test scenario.

The Screenplay Pattern is beautiful in its simplicity. It's made up of five elements, five types of building blocks that Testla gives you to design any functional acceptance test you need, no matter how sophisticated or how simple.

> The key elements of the pattern are: actors, abilities, tasks, actions and questions.

<p align="center" width="100%">
    <img width="70%" src="https://github.com/testla-project/testla-screenplay-core-js/blob/7914742775b25003da0086f3d3d228a77fd98b84/doc/assets/screenplay.png"> 
</p>

## How to start using the project

- Clone project

```
git clone git@github.com:OlekNarRpr/Playwright-screenplay-poc-structure.git
```

- Open project folder in Visual code
- Open a terminal
  - npm install
  - npx playwright install --with-deps
  - npm install --save-dev @testla/screenplay-playwright
- Check Extension
  - Playwright Test for VSCode shoudl be installed
- Happy testing

## Setup linting and code styles

Install these into VSCode:
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

Go to settings in VSCode and type `defaultformatter` and select `Prettier - Code formatter` as the Editor: Default Formatter

Restart VSCode if necessary, then make a change to a file by just adding a space or new line at the end of a line. Then save the file.
The file you saved should be reformatted to the new style guidelines.

If that doesn't work, try searching for `format on save` in the settings search bar and check the "Editor: Format on Save Box"

## Folder Structure

For now the project consist of a folder name **APPS** that contains a folder .COM (meaning if for tests in main website) the vision is that we will have other folders depending what products is that we are testing.
**helpers** folder contains dbHelper to connect to a DB or any other third party library
**data** folder contains all necesary date for validation and test setup
**lib** folder contains a locators, questions, tasks
**test** folder contains tests

```
Keep in mind as the project evolves the structure will change to accomodate and organize better the project
```

. Project Folder

- APP
  - API - TBD
  - UI
    - data
    - helpers
    - lib
    - tests

## .ENV File

To be able to run tests locally you will have to create a **.env** file in the root of the project and updating with the correct information. - TBD

## Reports

Right now when runing tests all reports including an html version and a Junit version will be saved in a folder call playwright-report
Reports are configured in case of a failure to attach a screenshot of the page where the failure happen.

## Whats next

- [ ] Add more tests
- [ ] Build API tests
- [ ] Project evolution

## Best Practices

### Naming convention

- Classes: Class names should be nouns, in mixed case with the first letter of each internal word capitalized. Try to keep your class names simple and descriptive. Use whole words-avoid acronyms and abbreviations (unless the abbreviation is much more widely used than the long form, such as URL or HTML).
  Examples: class Raster, class ImageSprite.
- Interfaces: Interface names should be capitalized like class names.
  Examples: interface RasterDelegate, interface Storing.
- Methods: Methods should be verbs, in mixed case with the first letter lowercase, with the first letter of each internal word capitalized.
  Examples: run(), runFast(), getBackground().
- Variables: Variable names should be short yet meaningful. The choice of a variable name should be mnemonic- that is, designed to indicate to the casual observer the intent of its use. One-character variable names should be avoided except for temporary "throwaway" variables. Common names for temporary variables are i, j, k, m, and n for integers; c, d, and e for characters.
  Examples: int i, char c, float myWidth.
- Constants: The names of variables declared class constants and of ANSI constants should be all uppercase with words separated by underscores ("\_").
  Examples: MIN_WIDTH = 4, GET_THE_CPU = 1, FBT_CLUB_LASTNAME_1
- Test Tags: Include the test level (TBD: L1, L2), No dashes, CamelCase, NO acronyms, Plural only IF the feature is plural (rule of thumb, if the repo is plural, the test tag is plural)
  Examples: @L1Login, @L2MyAccount

### Style

- UpperCamelCase: Use this convention for classes, interfaces, types, enums, decorators, and type parameters.
  Example: class MyClass, interface MyInterface, enum MyEnum, @MyDecorator, <T extends MyType>
- lowerCamelCase: Use this convention for variables, parameters, functions, methods, properties, and module aliases.
  Example: const myVariable, function myFunction(parameter: string), class MyClass { myProperty: number }, import myModuleAlias from 'my-module'
- CONSTANT_CASE: Use this convention for global constant values, including enum values.
  Example: const MY_CONSTANT = 'constant value', enum MyEnum { VALUE_ONE = 1, VALUE_TWO = 2 }

### UI Test Automation best practices

- Test user-visible behavior
  Automated tests should verify that the application code works for the end users, and avoid relying on implementation details such as things which users will not typically use, see, or even know about such as the name of a function, whether something is an array, or the CSS class of some element. The end user will see or interact with what is rendered on the page, so your test should typically only see/interact with the same rendered output.
- Make tests as isolated as possible
  Each test should be completely isolated from another test and should run independently with its own local storage, session storage, data, cookies etc.
- Avoid testing third-party dependencies
  Only test what you control. Don't try to test links to external sites or third party servers that you do not control.
- Name the Test Cases & Test Suites Appropriately
  Test names should be very clear and provide a self-descriptive idea about which exact functionality is being tested by using this test.
- Use web first assertions
  Assertions are a way to verify that the expected result and the actual result matched or not. By using web first assertions Playwright will wait until the expected condition is met. https://playwright.dev/docs/test-assertions.
- Hard Assert vs. Soft Assert
  Hard Assert This type of assertions is good practice for test that should make only one specific assertion.
  Soft Assert: This type of assertions is used when you need to assert a condition but to let the test continue. By using soft assertions, your test execution flow will continue even if one of your assertions failed.

### Managing .env File and Secrets - TBD

### Test Organization and Annotation

Keep tests related to specific functionality in associated files.
Use annotation to group tests.
Examples: @L1, @L2
