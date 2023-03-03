// Add recommended content section

// Add "Recommended content" heading
var paragraph = document.getElementById("recommended-articles");
paragraph.insertAdjacentHTML(
  "beforeBegin",
  '<div class="recommended-heading">Recommended content</div'
);

// Add recommended articles

// Root of site
var baseUrl = window.location.origin;

// Path of url after site root with trailing slash cut off
var pageUrl = window.location.pathname.slice(1);

// Get json of recommended articles
var recommended = (function () {
  var json = null;
  $.ajax({
    async: false,
    global: false,
    url: baseUrl + "/sourcedContent/recommended.json",
    dataType: "json",
    success: function (data) {
      json = data;
    },
  });

  // Get json of site output with url, title, and text of all articles
  var indexJson = null;
  $.ajax({
    async: false,
    global: false,
    url: baseUrl + "/index.json",
    dataType: "json",
    success: function (data) {
      indexJson = data;
    },
  });

  // For every object in the "Recommended" json file...
  for (var k in json) {
    // If the URL names in the "Recommended" json file matches the URL of the website page...
    if (k === pageUrl) {
      var arrayLength = json[k].articles.length;
      for (var i = 0; i < arrayLength; i++) {
        // This ID is in a div on "_master.tmpl"
        var paragraph = document.getElementById("recommended-articles");

        // For every "href" key in the index.json file, get the accompanying "title" key and make it part of the recommended link
        for (var j in indexJson) {
          var match = indexJson[j].href;
          if (match === json[k].articles[i]) {
            paragraph.insertAdjacentHTML(
              "beforeBegin",
              '<div class="col-sm-12" id="recommended"><a href="' +
                baseUrl +
                "/" +
                json[k].articles[i] +
                '">' +
                indexJson[j].title +
                "</a></div>"
            );
          }
        }
      }
    }

    // Add customer community content links
    var hccBaseUrl = "https://community.<your-site>.com/";
    var contentType = "Your Community";

    if (json[k].hcCommunity !== undefined) {
      hccData = json[k]["hcCommunity"];
      for (let m in hccData) {
        paragraph.insertAdjacentHTML(
          "beforeBegin",
          '<div class="col-sm-12" id="recommended"><span id="content-type">' +
            contentType +
            '</span><a href="' +
            hccBaseUrl +
            hccData[m]["path"] +
            '">' +
            hccData[m]["title"] +
            "</a></div>"
        );
      }
    }
  }

  return recommended;
})();
