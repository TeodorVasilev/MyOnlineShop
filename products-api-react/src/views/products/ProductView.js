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
                this.setState({
                    product: response
                })
            })
    }

    componentDidMount() {
        this.loadProduct();
    }

    render() {
        let images = [];
        if (this.state.product && this.state.product.images) {
            images = this.state.product.images.map(image => {
                console.log(image);
                return <div className="col-md-6"><img className="img-fluid border rounded" key={image.id} src={`data:image/jpeg;base64,${image.binaryData}`} alt={`Product ID: ${image.productId}`} /></div>
            })
        }
        return (
            <TopLayout>
                <div>
                    <div className="container">
                        <div className="row mt-4">
                            <div className="col-md-7">
                                <div className="row">
                                    {images}
                                </div>
                            </div>
                            <div className="col-md-5">
                                <h3>{this.state.product.name}</h3>
                                <p>{this.state.product.description}</p>
                                <p><strong>Price:</strong>{this.state.product.price}$</p>
                                <div>
                                    <button className="btn btn-primary">Add to Cart</button>
                                </div>
                                <div className="my-2">
                                    <button className="btn btn-secondary">Fast Order</button>
                                </div>
                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                About product
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
                                                Shipment and payment
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