import https from 'https';

export const rapidApiDetailController = (req, res) => {
    const options = {
        method: 'GET',
        hostname: process.env.X_RAPID_HOST,
        port: null,
        path: '/about',
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.X_RAPID_HOST
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
    const options = {
        method: 'POST',
        hostname: process.env.X_RAPID_HOST,
        port: null,
        path: '/submissions',
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.X_RAPID_HOST
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
        source_code,
        stdin
    }));
    rapidReq.end();
}

export const rapidApiResultController = (req, res) => {
    const { id } = req.params;
    const options = {
        method: 'GET',
        hostname: process.env.X_RAPID_HOST,
        port: null,
        path: `/submissions/${id}`,
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.X_RAPID_HOST
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
