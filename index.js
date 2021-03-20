const app = require('./src');

const port = process.env.PORT || 3550;
// App listening
app.listen(port, () => {
  console.log(`Listening on the port ${port}`);
});
