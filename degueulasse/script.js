function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


for (const image of document.querySelectorAll("img")) {
    image.crossOrigin = "anonymous"
    image.onload = async () => {
        if (image.crossOrigin != "anonymous") {
            image.crossOrigin = "anonymous";
        } else {
            const maxDifferentRes = 12;
            const allCanvas = [];
            const resizeCanvas = document.createElement("canvas");
            const resizeCtx = resizeCanvas.getContext("2d");
            document.body.appendChild(resizeCanvas);
            for (let i = 0; i < maxDifferentRes; i += 4) {
                let canvas = document.createElement("canvas");
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                let ctx = canvas.getContext("2d");

                resizeCanvas.width = image.naturalWidth / (i + 1);
                resizeCanvas.height = image.naturalHeight / (i + 1);
                resizeCtx.clearRect(0, 0, resizeCanvas.width, resizeCanvas.height);
                resizeCtx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, resizeCanvas.width, resizeCanvas.height);
                ctx.drawImage(resizeCanvas, 0, 0, canvas.width, canvas.height);
                allCanvas.push(canvas);
            }
            // return;
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
            console.log(allCanvas)
            for await (const resizedCanvas of allCanvas.reverse()) {
                let r = 0, deg = 0;
                while (r < Math.max(image.naturalHeight, image.naturalHeight)) {
                    let x = 1, y = 0;
                    x = Math.cos(deg) * r + image.naturalWidth / 2;
                    y = Math.sin(deg) * r + image.naturalHeight / 2;

                    deg += Math.PI / 60;
                    if (deg % (Math.PI) < 1) {
                        // console.error("PUTE")
                        r += 0.02;
                    }

                    let resizedCtx = resizedCanvas.getContext("2d");
                    let pixelInfo = resizedCtx.getImageData(x, y, 1, 1);
                    secondCtx.fillStyle = `rgba(${pixelInfo.data[0]},${pixelInfo.data[1]},${pixelInfo.data[2]},${pixelInfo.data[3]})`;
                    secondCtx.fillRect(x, y, 1, 1);
                    // wait 10 seconds
                    await new Promise(async (resolve) => {
                        setTimeout(() =>
                            resolve()
                            , 0.00000000000001)
                    });
                }
            }
        }
    }
}