import sharp from "sharp"

const getTransparentSize = (pixels,width) =>{
        
    let lowestColumn;
    let highestColumn;
    let lowestRow;
    let highestRow;
    let startingPixel = {}
    let  firstTransparentPixel = true

    console.log("pixelLength : ",pixels.length)

     for(let i=3;i < pixels.length;i += 4){

        if(pixels[i] === 0){
            const column = Math.floor((i/4) % width)
            const row = Math.floor((i/4) / width)

            if(firstTransparentPixel){
                lowestColumn = column
                highestColumn = column
                lowestRow = row
                highestRow = row

                firstTransparentPixel = false
            } else{

                if(column < lowestColumn){
                    lowestColumn = column
                }

                if(column > highestColumn){
                    highestColumn = column
                }

                if(row < lowestRow){
                    lowestRow = row
                }

                if(row > highestRow){
                    highestRow = row
                }
            }
        }
     }

       startingPixel = {x:lowestColumn,y:lowestRow}

        const transparentWidth = highestColumn - lowestColumn + 1
        const transparentHeight = highestRow - lowestRow + 1

        return {
            startingPixel,
            transparentHeight,
            transparentWidth
        }
 }


 const getPixelData = async(imagePath) =>{
    try {
        if(!imagePath){
            throw new Error("No imagePath found!")
        }
      
         const {data,info} = await sharp(imagePath).raw().toBuffer({resolveWithObject:true})
         const pixelArray = new Uint8ClampedArray(data.buffer)
         console.log("imageWidth : ",info.width)
         console.log("imageHeight : ",info.height)
         const result = getTransparentSize(pixelArray,info.width)
         return {
            ...result,
            imageWidth:info.width,   //The width of the entire image
            imageHeight:info.height  //The height of the entire image
         }
    } catch (error) {
        throw error
    }

 }


  export {
    getPixelData,
    getTransparentSize
  }
