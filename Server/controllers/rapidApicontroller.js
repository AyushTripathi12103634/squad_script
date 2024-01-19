import https from 'https';

export const rapidApiDetailController = (req, res) => {
    const options = {
        method: 'GET',
        hostname: 'judge0-ce.p.rapidapi.com',
        port: null,
        path: '/about',
        headers: {
            'X-RapidAPI-Key': 'be270101a9msh71e010a34142a60p1cf850jsn047413fa904a',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    const rapidReq = https.request(options, function (rapidRes) {
        const chunks = [];

        rapidRes.on('data', function (chunk) {
            chunks.push(chunk);
        });

        rapidRes.on('end', function () {
            const body = Buffer.concat(chunks);
            res.send(body.toString());
        });
    });

    rapidReq.end();
}

export const rapidApiCompileController = (req, res) => {
    const { language_id, source_code, stdin } = req.body;

    // Base64 encode source_code and stdin
    const encodedSourceCode = Buffer.from(source_code).toString('base64');
    const encodedStdin = Buffer.from(stdin).toString('base64');

    const options = {
        method: 'POST',
        hostname: 'judge0-ce.p.rapidapi.com',
        port: null,
        path: '/submissions?base64_encoded=true&fields=*',
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'be270101a9msh71e010a34142a60p1cf850jsn047413fa904a',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    const rapidReq = https.request(options, function (rapidRes) {
        const chunks = [];

        rapidRes.on('data', function (chunk) {
            chunks.push(chunk);
        });

        rapidRes.on('end', function () {
            const body = Buffer.concat(chunks);
            res.send(body.toString());
        });
    });

    rapidReq.write(JSON.stringify({
        language_id,
        source_code: encodedSourceCode,
        stdin: encodedStdin
    }));

    rapidReq.end();
}

export const rapidApiResultController = (req, res) => {
    const { id } = req.params;

    const options = {
        method: 'GET',
        hostname: 'judge0-ce.p.rapidapi.com',
        port: null,
        path: `/submissions/${id}?base64_encoded=true&fields=*`,
        headers: {
            'X-RapidAPI-Key': 'be270101a9msh71e010a34142a60p1cf850jsn047413fa904a',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    const rapidReq = https.request(options, function (rapidRes) {
        const chunks = [];

        rapidRes.on('data', function (chunk) {
            chunks.push(chunk);
        });

        rapidRes.on('end', function () {
            const body = Buffer.concat(chunks);
            const decodedBody = Buffer.from(body.toString(), 'base64').toString('utf8');
            res.send(decodedBody);
        });
    });

    rapidReq.end();
}
