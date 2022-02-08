function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getImageData(imagePath, callback) {
    var xml = new XMLHttpRequest();
    xml.onload = function () {
        var fileReader = new FileReader();
        fileReader.onloadend = function () {
            callback(fileReader.result);
        };
        fileReader.readAsDataURL(xml.response);
    };
    xml.open("GET", imagePath);
    xml.responseType = "blob";
    xml.send();
}


for (const image of document.querySelectorAll("img")) {
    image.crossOrigin = "anonymous"
    image.onload = async () => {
        if (image.crossOrigin != "anonymous") {
            image.crossOrigin = "anonymous";
        } else {
            const firstCanvas = document.createElement("canvas");
            const firstCtx = firstCanvas.getContext("2d");
            firstCanvas.crossOrigin = "anonymous";
            const imageWidth = image.naturalWidth;
            const imageHeight = image.naturalHeight;
            firstCanvas.width = image.naturalWidth;
            firstCanvas.height = image.naturalHeight;
            firstCanvas.id = image.id;
            firstCanvas.attributes = image.attributes;
            firstCanvas.style = image.style;
            firstCanvas.classList = image.classList;

            const secondCanvas = firstCanvas.cloneNode();
            const secondCtx = secondCanvas.getContext("2d");

            image.parentNode.replaceChild(secondCanvas, image);
            firstCtx.drawImage(image, 0, 0);
            // secondCtx.drawImage(image, 0,0);

            const drawnPixel = new Array(imageWidth);
            for (let i = 0; i < imageWidth; i++) {
                drawnPixel[i] = new Array(imageHeight).fill(false);
            }
            var width = 0; // width
            var height = 0; // height

            for (height = 0; height < imageHeight - 1; height++) {
                var pixelInfo = firstCtx.getImageData(width, height, 1, 1);
                secondCtx.fillStyle = `rgba(${pixelInfo.data[0]},${pixelInfo.data[1]},${pixelInfo.data[2]},${pixelInfo.data[3]})`;
                secondCtx.fillRect(width, height, 1, 1);
                drawnPixel[width][height] = true;
                //wait 10 seconds
                await new Promise(async (resolve) => { await setTimeout(resolve, 1) });
            }

            for (width = 0; width < imageWidth - 1; width++) {
                let pixelInfo = firstCtx.getImageData(width, height, 1, 1);
                secondCtx.fillStyle = `rgba(${pixelInfo.data[0]},${pixelInfo.data[1]},${pixelInfo.data[2]},${pixelInfo.data[3]})`;
                secondCtx.fillRect(width, height, 1, 1);
                drawnPixel[width][height] = true;
                //wait 10 seconds
                await new Promise(async (resolve) => { await setTimeout(resolve, 1) });
            }

            for (height = imageHeight - 1; height > 0; height--) {
                let pixelInfo = firstCtx.getImageData(width, height, 1, 1);
                secondCtx.fillStyle = `rgba(${pixelInfo.data[0]},${pixelInfo.data[1]},${pixelInfo.data[2]},${pixelInfo.data[3]})`;
                secondCtx.fillRect(width, height, 1, 1);
                drawnPixel[width][height] = true;
                //wait 10 seconds
                await new Promise(async (resolve) => { await setTimeout(resolve, 1) });
            }

            for (width = imageWidth - 1; width > 0; width--) {
                let pixelInfo = firstCtx.getImageData(width, height, 1, 1);
                secondCtx.fillStyle = `rgba(${pixelInfo.data[0]},${pixelInfo.data[1]},${pixelInfo.data[2]},${pixelInfo.data[3]})`;
                secondCtx.fillRect(width, height, 1, 1);
                drawnPixel[width][height] = true;
                //wait 10 seconds
                await new Promise(async (resolve) => { await setTimeout(resolve, 1) });
            }


            while (!drawnPixel.every(heightArr => heightArr.every(drawn => drawn === true))) {
                let pixelFound = false;
                while (!pixelFound) {
                    width = getRandomInt(0, imageWidth - 1);
                    height = 0;
                    if (drawnPixel[width].every(drawn => drawn === true)) {

                        continue;
                    } else {
                        let heightFound;
                        while (!heightFound) {
                            height = getRandomInt(0, imageHeight - 1);
                            if (drawnPixel[width][height] !== true) {
                                heightFound = true;
                            }
                        }
                        pixelFound = true;
                    }
                }
                let pixelInfo = firstCtx.getImageData(width, height, 1, 1);
                secondCtx.fillStyle = `rgba(${pixelInfo.data[0]},${pixelInfo.data[1]},${pixelInfo.data[2]},${pixelInfo.data[3]})`;
                secondCtx.fillRect(width, height, 1, 1);
                drawnPixel[width][height] = true;
                //wait 10 seconds
                await new Promise(async (resolve) => {
                    setTimeout(() =>
                        resolve()
                        , 1)
                });
            }
        }
    }
}