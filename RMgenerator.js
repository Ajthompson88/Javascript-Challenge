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
      message: 'Who are the authors of this work?',
      name: 'authors',
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
  const { title, description, installation, github, authors, license } = response;

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

## Description
${description || 'No description provided'}

## Installation
${installation || 'No installation instructions provided'}

## Usage
![Usage Image](assets/usage.png)


## Deployment
${github || 'No GitHub URL provided'}

## Authors
${authors || 'No authors provided'}

## License
${license || 'No license provided'}
`;

  fs.writeFile('GeneratedREADME.md', readContent, (err) => {
    if (err) {
      console.error('Error writing to README.md:', err);
    } else {
      console.log('Portfolio saved to README.md');
    }
  });
})
.catch(error => console.log('Error during inquirer prompt:', error));