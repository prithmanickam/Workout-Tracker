const app = require('./app');
const PORT = process.env.PORT | 5000;
//app.listen(8080, () => console.log('server listening on port 8080'));
app.listen(PORT, () => console.log(`Listening at ${PORT}`));