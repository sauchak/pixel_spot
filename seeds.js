var mongoose = require('./config/database');

var User = require('./models/user');

var users = [
  { // 0
    name:   "Wayne Takeda",
    email: "whtakeda@gmail.com",
    googleId: "108804978195357308049",
    spots: [{title:"My favorite spot",
             description: "An awesome spot",
             image_url:"https://www.flickr.com/photos/joannarb2009/15844439235/in/photolist-pATgqL-aDpwBo-q5mpsN-byX3sF-bRBGVn-do9MWz-aDzUjt-q97TLP-nhwKB1-pzyQ69-aASTKL-hxAh1P-jTS82D-oaUccF-dm2Yyt-qq8zMH-efripA-q5hS11-e8y37Z-egHHrP-jGQQ7s-pxWyWk-aEnQos-ah1kdX-i7NAr4-pmQxSB-aDzTHH-q8dWb8-98MCzD-aAeKNU-pNohwn-ibBaSA-e5ZXDV-hACL91-dgEaan-isSanR-6ct9Bp-azJ5Uw-pNcJ1y-ovW9po-8ZE7Qh-qr81hQ-sA4rMz-p954Qu-devwU8-hQKvVK-7ify7c-7GjzFF-e4GtJJ-s6akH9",
             address:"",
             rating:0,
             tags:[{tag_name:"park"},{tag_name:"trees"},{tag_name:"bench"}]
            },
            {title:"Another great spot",
             description: "This spot is da bomb!!!!",
             image_url:"https://www.flickr.com/photos/132798455@N03/18554736046/in/photolist-7Dbm4a-czUh2d-qX7VY7-dovS5-wzpJKN-ugBSAb-okLKRs-yjXUTG-nqmwci-oUMovm-gbtenn-ft52u1-96qVXs-b21hdT-8i748z-nWdZaj-9CCyzX-dnVoPa-xiULJR-r5WuHj-8aohwc-88y18C-cGDZsm-a4HPi4-nYRLop-7VZP3A-qNUD8y-nGHKsL-roydfo-sbBpCy-4YFxrv-fowQUZ-pA7yaT-tgxY5b-4YXFfh-osfRD6-96VLrm-6EKiai-4aEoXz-yhGpKB-oZgMa9-sDAh8i-avXwRN-oX5MrM-9k5McQ-nqm9TN-2bDsm9-aHsUPk-6GmfjM-apcKFk",
             address:"",
             rating:0,
             tags:[{tag_name:"cat"},{tag_name:"bench"}]
            }]
  }
];

User.remove({}, function(err) {
  if (err) console.log(err);
  User.create(users, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + users.length  + " users.");
      mongoose.disconnect();
    }
  });
});
