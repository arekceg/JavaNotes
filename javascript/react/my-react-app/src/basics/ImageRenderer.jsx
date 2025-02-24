import React from "react";

const ImageRenderer = ({  highlightClass }) => {
    return renderImages();

    function renderImages() {
        return getImagesToRender().map((image, index) => {
            return <img
                key={index}
                src={image}
                alt="Picture of a ramen dish"
                className={`ramen-image ${highlightClass}`} />
        })

    }

    function getImagesToRender() {
        return [
            "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/c4e7f587-e9e1-4953-b032-f58f82e91f4d/Derivates/4b8b814f-8562-4ad0-8db8-9939cb103685.jpg",
            "https://www.platebykate.com/wp-content/uploads/2023/01/ramen-z-kaczki.jpg",
            "https://www.unileverfoodsolutions.pl/dam/global-ufs/mcos/nee/poland/recipe/3.jpg"
        ];
    }
}

export default ImageRenderer;