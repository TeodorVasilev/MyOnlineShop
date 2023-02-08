import React from "react";
import TopLayout from "../../layout/TopLayout";
import Constants from "../../constants/Constants";

class ProductView extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        product: {}
    }

    loadProduct = () => {
        fetch(Constants.BASE_URL + `Products/${this.props.location.state.productId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response);
            })
    }

    componentDidMount() {
        this.loadProduct();
    }

    render() {
        console.log(this.state);
        // let image = '';
        // if(this.props.images.length !== 0){
        //     image = `data:image/png';base64,${this.props.images[0].binaryData}`;
        // }
        return (
            <TopLayout>
                <div>
                    {/* {this.props.location.state.productId} */}
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <img src="product-image.jpg" alt="product image" />
                            </div>
                            <div className="col-md-4">
                                <h3>Product Name</h3>
                                <p>Product Description</p>
                                <p><strong>Price:</strong> $XX</p>
                                <div>
                                    <button className="btn btn-primary">Add to Cart</button>
                                </div>
                                <div>
                                    <button className="btn btn-secondary">Fast Order</button>
                                </div>
                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Accordion Item #1
                                            </button>
                                        </h2>
                                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingTwo">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Accordion Item #2
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TopLayout>
        );
    }
}

export default ProductView