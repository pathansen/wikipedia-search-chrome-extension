// Patrick Hansen
// 23 December 2017
// Wikipedia Searching Chrome Extension

let buttonClick = function() {

    getUserInput().then(function(result) {
        return resetListing(result);
    }).then(function(result) {
        return getData(result);
    }).then(function() {
        // console.log('finished');
    })

}

let getUserInput = function() {

    return new Promise(function(resolve) {
        let userInput = document.getElementById("user-input").value;
        let query = userInput.replace(/\s+/g, '_');
        resolve(query);
    });

}

let resetListing = function(query) {

    return new Promise(function(resolve) {
        let divs = document.getElementsByTagName("div");
        let listing = divs[2].childNodes;
        console.log(listing);
        let count = listing.length;
        console.log(count);

        let parent = document.getElementById('result-listing');
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

let getData = function(query) {

    return new Promise(function(resolve) {
        let search_url  = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
        let url         = search_url + query;

        $.ajax({
            url: url,
            dataType: "jsonp",
            success: actOnData
        });
        resolve(true);
    })
}

let actOnData = function(result) {

    for (i in result[1]) {

        let resultDiv = document.createElement('div');
        resultDiv.id  = result[1][i];
        resultDiv.id  = resultDiv.id.replace(/\s+/g, '-');
        resultDiv.id  = resultDiv.id.replace(/[(]/g, '_');
        resultDiv.id  = resultDiv.id.replace(/[)]/g, '_');
        resultDiv.className = "result";

        let title = document.createElement('h5');
        title.className = "result-title";
        title.innerHTML = result[1][i];

        let info = document.createElement('h6');
        info.className = "result-info";
        info.innerHTML = result[2][i];

        let link = document.createElement('a');
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
