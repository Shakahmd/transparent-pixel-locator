# transparent-image-size

A package to get the size and position of transparent areas in an image.
Scans through an image's pixel data to find the first transparent pixel and then determines the boundaries of the transparent area (width and height) by Tracking the lowest and highest columns and rows that contain transparent pixels. It returns the starting pixel coordinates and the dimensions of the Transparent area.


## Installation

npm install transparent-pixel-locator

## Usage

```javascript

import { getPixelData } from 'transparent-pixel-locator'

async function processImage() {
    try {
        const result = await getPixelData('/path/to/your/image.png');
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

processImage();

```

## return Value

The getPixelData function returns an object with the following properties:

startingPixel: The top-left coordinate of the transparent area
transparentHeight: The height of the transparent area
transparentWidth: The width of the transparent area



