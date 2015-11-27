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
             image_url: "https://farm8.staticflickr.com/7468/15844439235_5a5b8457a9.jpg",
             lat: 51.7524909999999991,
             lng: 19.4755299999999991,
             address:"",
             zipcode:"",
             rating:0,
             tags:[{tag_name:"park"},{tag_name:"trees"},{tag_name:"bench"}]
            },
            {title:"Another great spot",
             description: "This spot is da bomb!!!!",
             flickr_url:"https://www.flickr.com/photos/132798455@N03/18554736046",
             image_url:"https://farm1.staticflickr.com/539/18554736046_39eea3ea0d.jpg",
             lat: -34.6337109999999981,
             lng: -58.3603099999999984,
             address:"",
             zipcode:"1871",
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
             image_url: "https://farm9.staticflickr.com/8713/17029832935_2915d0a5d9.jpg",
             lat: 19.9936320000000016,
             lng: -87.4655910000000034,
             address:"",
             zipcode:"",
             rating:0,
             tags:[{tag_name:"beach"},{tag_name:"sand"},{tag_name:"log"}]
            },
            {title:"The Forest",
             description: "Can't see the forest for the trees",
             flickr_url:"https://www.flickr.com/photos/christophebrutel/15164479128",
             image_url: "https://farm4.staticflickr.com/3858/15164479128_89bfe1fa7e.jpg",
             lat: 61.8141660000000002,
             lng: 29.3172220000000010,
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
             image_url: "https://farm8.staticflickr.com/7066/6936434987_7abeb04608.jpg",
             lat: 44.7824889999999982,
             lng: 20.4387089999999993,
             address:"",
             zipcode:"",
             rating:0,
             tags:[{tag_name:"park"},{tag_name:"trees"},{tag_name:"bridge"}]
            },
            {title:"Another great bench",
             description: "This spot is so benchy!",
             flickr_url:"https://www.flickr.com/photos/mr_acfreeman/4760107225",
             image_url:"https://farm5.staticflickr.com/4099/4760107225_0a8017bbd8.jpg",
             lat: 50.0850549999999970,
             lng: 14.4417109999999997,
             address:"",
             zipcode : "130 00",
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

