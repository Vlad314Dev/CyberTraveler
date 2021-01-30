import express from 'express';
import path from 'path';

const app = express();
const BUILD_SRC = __dirname; 
const INDEX_HTML = path.join(BUILD_SRC, 'index.html');
const PORT = 5314;

if (process.env.NODE_ENV !== 'production') {
    console.log('------========Development mode========-----');
}

app.use(express.static(BUILD_SRC));

app.get('*', function (req, res) {
    res.sendFile(INDEX_HTML);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${ PORT }`);
});
