//Install express server
const express = require('express');
const path = require('path');

const app = express();

let issues = [{ Id: 0,
    CreatedDate: (new Date()).toString(),
    Description: 'Default',
    Severity: 'Minor',
    Status: 'Closed'
  }];
app.use(express.json());
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/issue-tracker'));

//read
app.get('/api', (req,res)=> {
  res.send(issues);
  //res.render('view-issues', {title:'Issue Tracker', issues: issues});
});

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/issue-tracker/index.html'));
});

//create
app.post('/api', (req,res)=> {
  const issue = { "Id": req.body.Id,
      "CreatedDate": req.body.CreatedDate,
      "Description": req.body.Description,
      "Severity":req.body.Severity,
      "Status":req.body.Status,
      "ResolvedDate":req.body.ResolvedDate
  };
  issues.push(issue);
  console.log(req.body);
  res.send(issue);
  //res.redirect('/issues');
});
//update
app.put('/api',(req,res)=>{
  const issue = issues.find(c => c.Id == req.body.Id);
  if(!issue) return res.status(404).send("<h3>No issues are found for the given id.</h3>")
  issue.CreatedDate = req.body.CreatedDate;
  issue.Description = req.body.Description;
  issue.Severity = req.body.Severity;
  issue.Status = req.body.Status;
  issue.ResolvedDate = req.body.ResolvedDate;
  res.send(issue);
  //res.redirect('/issues');
})
//delete
app.delete('/api/:id',(req,res)=>{
  const issue = issues.find(c => c.Id == req.params.id);
  if(!issue) return res.status(404).send("<h3>No issues are found for the given id.</h3>")

  const index = issues.indexOf(issue);
  issues.splice(index, 1);
  console.log('deleted');
  res.send(issue);
  // res.redirect('/issues');
})
// Start the app by listening on the default Heroku port
//app.listen(process.env.PORT || 8080);
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server is listening on port ${port}....`);