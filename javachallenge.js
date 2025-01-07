import inquirer from 'inquirer';
import fs from 'fs'; 

const promptInformation = async (information = []) => {
  const { title, description, installation } = await inquirer.prompt([
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
  ]);

  information.push({ title, description, installation });

  return information;
};

inquirer.prompt([
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
])
.then(async (response) => {
  const information = await promptInformation();

  const combinedResponse = { ...response, information };

  const jsonResponse = JSON.stringify(combinedResponse, null, 2);

  fs.writeFile('response.json', jsonResponse, (err) => {
    if (err) {
      console.error('Error writing to response.json:', err);
    } else {
      console.log('Responses saved to response.json');
    }
  });

  const title = information[0]?.title || 'Project Title'; // Default title if not provided
  const readContent = `
# ${title}

## Description

## Installation

## Usage

## Deployment

## Authors

## License
`;

  fs.writeFile('README.md', readContent, (err) => {
    if (err) {
      console.error('Error writing to README.md:', err);
    } else {
      console.log('Portfolio saved to README.md');
    }
  });
})
.catch(error => console.log('Error during inquirer prompt:', error));