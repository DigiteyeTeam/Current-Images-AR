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
    const outputFile = path.join(__dirname, `data_images/data_${folderName.split('/').pop()}.json`);

    fs.readdir(imageFolder, (err, files) => {
        if (err) {
            console.error('Error reading the folder', err);
            return;
        }

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        const tableData = imageFiles.map((file, index) => ({
            name: `Image ${index + 1}`,
            image: `${folderName}/${file}`,
            show: true  // Set default to true
        }));

        ensureDirectoryExistence(outputFile);
        fs.writeFileSync(outputFile, JSON.stringify(tableData, null, 2), 'utf-8');
        console.log(`Data file for ${folderName} has been generated.`);
    });
}

generateData('images/gallery');
generateData('images/thevata');
