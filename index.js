const inquirer = require('inquirer');
const fs = require('fs');
const { renderLicenseBadge, renderLicenseSection } = require('./utils/generateMarkdown');

inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please provide a description of your project.',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please provide any installation instructions.'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide usage information.'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please select a license from the options below.',
        choices: ['Apache', 'MIT', 'BSD', 'Unlicense', 'None']
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please provide contribution guidelines.'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please provide testing instructions.'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please provide your GitHub username.'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please provide your e-mail address.',
        validate: function (input) {
          const emailRegex = /\S+@\S+\.\S+/;
          if (emailRegex.test(input)) {
            return true;
          } else {
            return 'Please enter a valid email address.';
          }
        },
      },
])
.then((answers) => {
    const { title, description, installation, usage, license, contributing, tests, github, email } = answers;

    const readmeTemplate = `
# ${title}

${renderLicenseBadge(license)}

## Description 
${description}

## Table of Contents 
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
${installation}

## Usage
${usage}

## Contributing 
${contributing}

## Tests
${tests}

${renderLicenseSection(license)}

## Questions
If you have any questions, please reach out to me via e-mail at ${email} or on [GitHub](https://github.com/${github})`;

        fs.writeFile('README.md', readmeTemplate, (err) => {
            if (err) throw err;
            console.log('README file created!');
        });
    });
