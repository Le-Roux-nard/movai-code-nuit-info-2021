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
            // document.body.appendChild(resizeCanvas);
            
            for (let i = 0; i < maxDifferentRes; i += 1) {
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
            
            const firstCanvas = document.createElement("canvas");
            const firstCtx = firstCanvas.getContext("2d");
            firstCanvas.crossOrigin = "anonymous";
            firstCanvas.width = image.naturalWidth;
            firstCanvas.height = image.naturalHeight;
            firstCanvas.id = image.id;
            firstCanvas.attributes = image.attributes;
            firstCanvas.style = image.style;
            firstCanvas.classList = image.classList;

            const secondCanvas = firstCanvas.cloneNode();
            const secondCtx = secondCanvas.getContext("2d");

            image.parentNode.replaceChild(secondCanvas, image);
            console.log(allCanvas);
            for await (const resizedCanvas of allCanvas.reverse()) {
                let r = 0, x = 0, y = 0, hyp = 0;
                x = image.naturalHeight / 2
                y = image.naturalWidth / 2
                hyp = Math.sqrt(x * x + y * y);
                console.log(image.naturalHeight / 2, image.naturalWidth / 2, r,);

                while (r < hyp) {

                    secondCtx.save();
                    secondCtx.beginPath();
                    secondCtx.arc(image.naturalWidth / 2, image.naturalHeight / 2, r, 0, Math.PI * 2, false);
                    secondCtx.clip();
                    secondCtx.drawImage(resizedCanvas, 0, 0, secondCanvas.width, secondCanvas.height);
                    secondCtx.restore();
                    r += 1;
                    await new Promise(async (resolve) => {
                        setTimeout(() =>
                            resolve(), 1)
                    });

                }
            }
        }
    }
}