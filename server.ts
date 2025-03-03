import * as http2 from 'http2';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

async function start() {
    const [key, cert]= await Promise.all([
        readFile('../certificates/key.pem'),
        readFile('../certificates/certificate.pem')
    ]);

    const server = http2.createSecureServer({ key, cert })
        .listen(8080, () => {
            console.info("Server online");
        });

    server.on('stream', (stream, headers) => {
        stream.respond({
            'content-type': '',
            ':status': 200
        });
        stream.end('<h1>Hello</h1>');
    });

    server.on('error', (err) => {
        console.error(`Something went wrong: ${err}`);
    })
}

start()