import React from 'react'
import "./ImageContainer.css"

const ImageContainer = ({ product, ClickHandler }) => {
    return (
        <div className="small-img-group">
            {product.images &&
                product.images.map((item, i) => (
                    <div className="small-img-col" key={i}>
                        <img
                            className="small-img"
                            key={i}
                            src={item.url}
                            alt={`${i}`}
                            onClick={ClickHandler}
                        />
                    </div>
                ))}
        </div>
    )
}

export default ImageContainer
