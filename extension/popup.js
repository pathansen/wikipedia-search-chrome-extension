// Patrick Hansen
// 23 December 2017
// Wikipedia Searching Chrome Extension

/**
 * @description Descripion here...
 * @returns {*} Return value here...
 */
const buttonClick = () => {
  getUserInput().then(function(result) {
    return resetListing(result);
  }).then(function(result) {
    return getData(result);
  }).then(function() {
    // console.log('finished');
  })
}


/**
 * @description Descripion here...
 * @returns {*} Return value here...
 */
const getUserInput = () => {
  return new Promise(function(resolve) {
    const userInput = document.getElementById("user-input").value;
    const query = userInput.replace(/\s+/g, '_');
    resolve(query);
  });
}


/**
 * @description Descripion here...
 * @param {*} query
 */
const resetListing = (query) => {
  return new Promise(function(resolve) {
    const divs = document.getElementsByTagName("div");
    const listing = divs[2].childNodes;
    console.log(listing);
    const count = listing.length;
    console.log(count);

    const parent = document.getElementById('result-listing');
    console.log(parent);
    for (l of listing) {
        console.log(l);
        parent.removeChild(l);
    }
    // for (let i = 0; i < count; i++) {
    //     let l = listing[i];
    //     console.log(l);
    //     let child = document.getElementById(l.id);
    //     let parent = document.getElementById('result-listing');
    //     parent.removeChild(child);
    //     console.log(i);
    // }
    resolve(query);
  });
}


/**
 * @description Descripion here...
 * @param {*} query
 */
const getData = (query) => {
  return new Promise(function(resolve) {
    const search_url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
    const url = search_url + query;

    $.ajax({
      url: url,
      dataType: "jsonp",
      success: actOnData
    });
    resolve(true);
  })
}


/**
 * @description Description here...
 * @param {*} result The result returned...
 */
const actOnData = (result) => {
  for (i in result[1]) {
    const resultDiv = document.createElement('div');
    resultDiv.id  = result[1][i];
    resultDiv.id  = resultDiv.id.replace(/\s+/g, '-');
    resultDiv.id  = resultDiv.id.replace(/[(]/g, '_');
    resultDiv.id  = resultDiv.id.replace(/[)]/g, '_');
    resultDiv.className = "result";

    const title = document.createElement('h5');
    title.className = "result-title";
    title.innerHTML = result[1][i];

    const info = document.createElement('h6');
    info.className = "result-info";
    info.innerHTML = result[2][i];

    const link = document.createElement('a');
    link.className = "result-link";
    link.href = result[3][i];
    link.target = "_blank";
    link.innerHTML = "<i class=\"fa fa-info-circle\"></i>";

    resultDiv.appendChild(title);
    resultDiv.appendChild(info);
    resultDiv.appendChild(link);

    document.getElementById('result-listing').appendChild(resultDiv);
  }
}

document.getElementById("my-button").addEventListener("click", buttonClick);
