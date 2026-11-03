(function(){
  BT.loadReviewedContent().then(function(){
    var isPlace=!!document.getElementById('placeName');
    var script=document.createElement('script');
    script.src=isPlace?'js/place.js':'js/weekly.js';
    document.body.appendChild(script);
  });
})();
