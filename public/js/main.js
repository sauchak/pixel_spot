$(document).ready(function() {
  console.log('document loaded!');

  var $destination,
      $templateEl,
      renderLi,
      renderedHtmlView;

  $destination = $('#spotscontainer');
  $templateEl  = $('#spot-template');
  renderLi = _.template($templateEl.html());

  $("#btn-search").on("click", function(evt){
    document.location.href="/spots/search/all?tags=" + $("#input-search").val();
  });

  $("#btn-advanced").on("click", function(evt){
    event.preventDefault();
    var defaultTags = $("[name=tags]:checked").map(function(){
      return $(this).val();
    }).get().join();

    $.ajax({
      url:"/spots/search/advanced",
      method:'GET',
      dataType: 'json',
      data: {"defaultTags":defaultTags, "additionalTags":$("#additional-tags").val(), "zipcode":$("#location").val()},
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
      document.location.href = "/spots/search/all?tags=" + $("#input-search").val();
      return false;
    }
  });

  $('#upvote').on("click",function(){
    vote($(this).attr("data-id"),$(this).attr("data-value"));
  })

  $('#downvote').on("click",function(){
    vote($(this).attr("data-id"),$(this).attr("data-value"));
  })

  var spotId;
  $('#modal-delete').on('show.bs.modal', function(evt) {
    spotId = $(evt.relatedTarget).data('id');
  });

  $('#confirm').on('click', function(e) {
    $.ajax({
      url:"/spots/" + spotId,
      method:'DELETE',
    }).done(function(data){
        $("#"+JSON.parse(data)).remove();
    });
  });

  $("[name=btn-advanced-edit]").on("click",function(){
    document.location.href = "/spots/" + $(this).attr("data-id") + "/edit";
  })

  $("#btn-edit").on("click",function(){
    var data = $('#edit-spot-form').serializeArray();
    console.log(data)
    $.ajax({
      url:"/spots/" + $(this).attr("data-id"),
      dataType: 'json',
      data: data,
      method:'PUT',
    }).done(
      function(data){
        document.location.href = "/users/" + JSON.parse(data);
      }
    );
  })

  function vote(id,value)
  {
    $.ajax({
      url:"/spots/" + id + "/vote",
      method:'GET',
      dataType: 'json',
      data: {"vote": value},
      context: document.body
    }).done(
      function(data){
        rating = JSON.parse(data);

        $destination = $('#rating');
        $destination.html(rating);
      }
    );
  }
})


