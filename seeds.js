var mongoose = require('./config/database');

var User = require('./models/user');
var DefaultTag = require('./models/tag');

var users = [
  {
    name:  "Wayne Takeda",
    email: "whtakeda@gmail.com",
    googleId: "108804978195357308049",
    spots: [{title:"My favorite spot",
             description: "An awesome spot",
             flickr_url:"https://www.flickr.com/photos/joannarb2009/15844439235",
             image_url:"",
             lat: 0,
             lng: 0,
             address:"",
             zipcode:"",
             rating:0,
             tags:[{tag_name:"park"},{tag_name:"trees"},{tag_name:"bench"}]
            },
            {title:"Another great spot",
             description: "This spot is da bomb!!!!",
             flickr_url:"https://www.flickr.com/photos/132798455@N03/18554736046",
             image_url:"",
             lat: 0,
             lng: 0,
             address:"",
             zipcode:"",
             rating:0,
             tags:[{tag_name:"cat"},{tag_name:"bench"}]
            }
            ]
  },
  {
    name:  "Matthew Butt",
    email: "anakin2270@aol.com",
    googleId: "108804978195357308050",
    spots: [{title:"The Beach",
             description: "A very nice beach",
             flickr_url:"https://www.flickr.com/photos/parismadrid/17029832935",
             image_url:"",
             lat: 0,
             lng: 0,
             address:"",
             zipcode:"",
             rating:0,
             tags:[{tag_name:"beach"},{tag_name:"sand"},{tag_name:"log"}]
            },
            {title:"The Forest",
             description: "Can't see the forest for the trees",
             flickr_url:"https://www.flickr.com/photos/christophebrutel/15164479128",
             image_url:"",
             lat: 0,
             lng: 0,
             address:"",
             zipcode:"",
             rating:0,
             tags:[{tag_name:"tree"},{tag_name:"forest"}]
            }
            ]
  },
  {
    name:  "Chris Sauchak",
    email: "benchlover@gmail.com",
    googleId: "108804978195357308051",
    spots: [{title:"Where's the bench?",
             description: "A park with bridge",
             flickr_url:"https://www.flickr.com/photos/sunsward7/6936434987",
             image_url:"",
             lat: 0,
             lng: 0,
             address:"",
             zipcode:"",
             rating:0,
             tags:[{tag_name:"park"},{tag_name:"trees"},{tag_name:"bridge"}]
            },
            {title:"Another great bench",
             description: "This spot is so benchy!",
             flickr_url:"https://www.flickr.com/photos/mr_acfreeman/4760107225",
             image_url:"",
             lat: 0,
             lng: 0,
             address:"",
             zipcode:"",
             rating:0,
             tags:[{tag_name:"tree"},{tag_name:"park"},{tag_name:"bench"}]
            }
            ]
  }
];

User.remove({}, function(err) {
  if (err) console.log(err);
  User.create(users, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("Users seeded with " + users.length  + " users.");
//      mongoose.disconnect();
    }
  });
});


var tags = [
{tag_name: "Urban"},
{tag_name: "Nature"},
{tag_name: "Beach"},
{tag_name: "Park"},
{tag_name: "Couples"},
{tag_name: "Garden"},
{tag_name: "Museum"},
{tag_name: "Groups"}
];

DefaultTag.remove({}, function(err) {
  if (err) console.log(err);
  DefaultTag.create(tags, function(err, tags) {
    if (err) {
      console.log(err);
    } else {
      console.log("Tags seeded with " + tags.length  + " tags.");
      mongoose.disconnect();
    }
  });
});

