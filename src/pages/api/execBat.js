const { spawn } = require('child_process');

export default function handler(req, res) {
    if (req.method === 'GET') {
        const batFile = 'bat/scriptbotonsincronizarDB.bat'; // Ruta a tu archivo .bat

        // Ejecutar el archivo .bat
        const batProcess = spawn('cmd.exe', ['/c', batFile]);

        batProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        batProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        batProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            res.json({ message: 'Archivo .bat ejecutado correctamente' });
        });
    } else {
        return res.status(405).end();
    }
}