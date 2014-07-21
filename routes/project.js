var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

      models.Project
        .find({"_id": projectID})
        .sort('-date')
        .exec(afterQuery);
  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  //var listing = $.params(form_data);
  console.log(form_data['image_url']);

  var newProject = new models.Project({
      "title": form_data['project_title'],
      "date": new Date(form_data['date']),
      "summary": form_data['summary'],
      "image": form_data['image_url']
  });

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  newProject.save(afterSaving);

  function afterSaving(err){
      if(err) {console.log(err); res.send(500);}
      res.redirect('/');

  }


}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

    models.Project
        .find({"_id": projectID})
        .remove()
        .exec(afterDelete);

    function afterDelete(err){
      if(err){console.log(err);res.send();}
    }



  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}