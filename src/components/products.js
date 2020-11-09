import React from 'react';

function Products(props) {
    return (
        <div class=" col-md-4 col-sm-12">
            <div className="card">
                <img class="img-fluid" src={props.path} alt="Card image cap" />
                <div class="card-body">
                    <h5 class="text-left">{props.itemName}</h5>
                    <p class="card-text">{props.description}</p>
                    <button class="btn btn-grey"><i class="fa fa-eye"></i> Preview</button>
                    <button onClick= {() => props.removeProduct(props.id)} class="btn btn-grey ml-2"><i class="fa fa-trash"></i> Delete</button>
                    <button class="btn btn-grey ml-2"><i class="fa fa-shopping-cart"></i> Buy</button>
                </div>
            </div>
        </div>
    )
}

export default Products;