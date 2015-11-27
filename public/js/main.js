$(document).ready(function() {
  console.log('document loaded!');

  var $destination,
      $templateEl,
      renderLi,
      renderedHtmlView;

  $destination = $('#spotscontainer');
  $templateEl  = $('#spot-template');
  renderLi = _.template($templateEl.html());

  $.ajax({
    url:"http://localhost:3000/spots",
    method:'GET',
    dataType: 'json',
    context: document.body
  }).done(
    function(data){
      data = JSON.parse(data);
      console.log(data);

      data.forEach(function(d)
      {
        renderedHtmlView = renderLi({spot_title:d.title, description:d.description, image_url:d.image_url});
        $destination.append(renderedHtmlView);
      });

    }
  );

  $.ajax({
    url:"http://localhost:3000/spots/search/all",
    method:'GET',
    dataType: 'json',
    context: document.body
  }).done(
    function(data){
      data = JSON.parse(data);
      console.log(data);

      data.forEach(function(d)
      {
        renderedHtmlView = renderLi({spot_title:d.title, description:d.description, image_url:d.image_url});
        $destination.append(renderedHtmlView);
      });

    }
  );

  $("#btn-search").on("click", function(evt){
//    alert($("#input-search").val())
//    post('/spots/search/all', {tags: $("#input-search").val()});
console.log("Here")
    document.location.href="/spots/search/all?tags=" + $("#input-search").val()
  })

  $("#btn-advanced").on("click", function(evt){
    alert($("#input-search").val())
  })

})
