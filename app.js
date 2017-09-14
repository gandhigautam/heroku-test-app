const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.send('Hello Gautam -I Really Love You so Much! why gautam?')
})

app.listen(app.get('port'), function() {
  console.log('gautam test Node app is running on port', app.get('port'));
});
