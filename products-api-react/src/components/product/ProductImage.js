import React from "react";

const ProductImage = ({binaryData}) => {
    const base64 = btoa(
        new Uint8Array(binaryData).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      
        return <img src={`data:image/jpeg;base64,${base64}`} />;
    };

export default ProductImage;