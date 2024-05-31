const fs = require('fs');
const path = require('path');

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function generateData(folderName) {
    const imageFolder = path.join(__dirname, folderName);
    const outputFile = path.join(__dirname, `public/data_images/data_${folderName.split('/').pop()}.json`);

    fs.readdir(imageFolder, (err, files) => {
        if (err) {
            console.error('Error reading the folder', err);
            return;
        }

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|png)$/i.test(file));
        const tableData = imageFiles.map((file) => {
            const fileNameWithoutExtension = path.parse(file).name;
            return {
                name: fileNameWithoutExtension,
                image: `${folderName}/${file}`,
                showNFC: false,    // Set default to true
                showAndroid: true, // Set default to true
                showApple: true   // Set default to true
            };
        });

        ensureDirectoryExistence(outputFile);
        fs.writeFileSync(outputFile, JSON.stringify(tableData, null, 2), 'utf-8');
        console.log(`Data file for ${folderName} has been generated.`);
    });
}

generateData('images/gallery');
generateData('images/thevata');
