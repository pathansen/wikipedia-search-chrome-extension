/**
 * @description Take user input and search using Wikipedia API
 */
const buttonClick = async () => {
  // Get user input
  const userInput = await getUserInput();

  // Make GET request to Wikipedia API
  const response = await fetch('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + userInput);
  const data = await response.json();

  // Display results
  actOnData(data);
}


/**
 * @description Get user input from input element
 * @returns {String} User input seperated by underscores
 */
const getUserInput = () => {
  const userInput = document.getElementById('user-input').value;
  return userInput.replace(/\s+/g, '_');
}


/**
 * @description Creates result listing from user search
 * @param {JSON} result JSON result from Wikipedia API GET request
 */
const actOnData = (result) => {
  for (i in result[1]) {
    const resultDiv = document.createElement('div');
    resultDiv.id = result[1][i];
    resultDiv.id = resultDiv.id.replace(/\s+/g, '-');
    resultDiv.id = resultDiv.id.replace(/[(]/g, '_');
    resultDiv.id = resultDiv.id.replace(/[)]/g, '_');
    resultDiv.className = 'result';

    const title = document.createElement('h5');
    title.className = 'result-title';
    title.innerHTML = result[1][i];

    const info = document.createElement('h6');
    info.className = 'result-info';
    info.innerHTML = result[2][i];

    const link = document.createElement('a');
    link.className = 'result-link';
    link.href = result[3][i];
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    link.innerHTML = '<i class=\'fa fa-info-circle\'></i> <b>Open in new tab</b>';

    resultDiv.appendChild(title);
    resultDiv.appendChild(info);
    resultDiv.appendChild(link);

    document.getElementById('result-listing').appendChild(resultDiv);
  }
}

const button = document.getElementById('my-button');
button.addEventListener('click', buttonClick);

const input = document.getElementById('user-input');
input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }
});
