import fs from 'fs';

const data = 'Hello, World!';

fs.writeFile('example.txt', data, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('File written successfully.');
  }
});

// const writeFile 