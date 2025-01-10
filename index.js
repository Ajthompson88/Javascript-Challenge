import inquirer from 'inquirer';
import fs from 'fs'; 

const promptInformation = async () => {
  const responses = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is your project title?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'What is your description?',
      name: 'description',
    },
    {
      type: 'input',
      message: 'What files will need to be installed?',
      name: 'installation',
    },
    {
      type: 'input',
      message: 'What is your GitHub URL?', 
      name: 'github',
    },
    {
      type: 'input',
      message: 'What is your email address?',
      name: 'email',
    },
    {
      type: 'input',
      message: 'Who are the authors of this work?',
      name: 'authors',
    },
    {
      type: 'input',
      message: 'How can others contribute to this project?',
      name: 'contributions',
    },
    {
      type: 'list',
      message: 'Choose a license for your project:',
      name: 'license',
      choices: ['MIT', 'GPLv3', 'Apache 2.0', 'BSD 3-Clause', 'None']
    }
  ]);

  return responses;
};

promptInformation().then((response) => {
  const { title, description, installation, github, email, authors, contributions, license } = response;

  const jsonResponse = JSON.stringify(response, null, 2);

  fs.writeFile('response.json', jsonResponse, (err) => {
    if (err) {
      console.error('Error writing to response.json:', err);
    } else {
      console.log('Responses saved to response.json');
    }
  });

  const readContent = `
# ${title || 'Project Title'}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Questions](#questions)
- [Contributions](#contributions)
- [Authors](#authors)
- [License](#license)

## Description
${description || 'No description provided'}

## Installation
${installation || 'No installation instructions provided'}

## Usage
![Usage Image](assets/usage.png)

## Questions
For any questions, please contact me at:
- GitHub: ${github || 'No GitHub URL provided'}
- Email: ${email || 'No email address provided'}

## Contributions
${contributions || 'No contribution guidelines provided'}

## Authors
${authors || 'No authors provided'}

## License
${license || 'No license provided'}
`;

  fs.writeFile('GeneratedREADME.md', readContent, (err) => {
    if (err) {
      console.error('Error writing to GeneratedREADME.md:', err);
    } else {
      console.log('Portfolio saved to GeneratedREADME.md');
    }
  });
})
.catch(error => console.log('Error during inquirer prompt:', error));