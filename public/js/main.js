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

      data.forEach(function(d)
      {
        renderedHtmlView = renderLi({spot_title:d.title, description:d.description, image_url:d.image_url});
        $destination.append(renderedHtmlView);
      });

    }
  );

  $("#btn-search").on("click", function(evt){
//    post('/spots/search/all', {tags: $("#input-search").val()});
    document.location.href="/spots/search/all?tags=" + $("#input-search").val();
  });

  $("#btn-advanced").on("click", function(evt){
    event.preventDefault();
    var defaultTags = $("[name=tags]:checked").map(function(){
      return $(this).val();
    }).get().join();

    $.ajax({
      url:"http://localhost:3000/spots/search/ajax",
      method:'GET',
      dataType: 'json',
      data: {"defaultTags":defaultTags, "additionalTags":$("#additional-tags").val()},
      context: document.body
    }).done(
      function(data){
        spots = JSON.parse(data);

        $destination.html("");
        renderedHtmlView = renderLi({tags: spots});
        $destination.append(renderedHtmlView);
      }
    );
  });


  $('#input-search').keypress(function (e) {
    if (e.which == 13) {
      document.location.href="/spots/search/all?tags=" + $("#input-search").val();
      return false;
    }
  });
/*
  $("#new-spot-form").on("submit", function(evt){
    $.ajax({
      url:"http://localhost:3000/spots/new",
      method:'POST',
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
  });
*/
})
/*
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}
*/
