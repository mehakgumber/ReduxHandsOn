import React from 'react';

function Banner() {
    return (
        <div class="jumbotron img-jmbo text-center">
            <div class="container">
                <h1 class="display-4 text-white " >Banner Title comes here!</h1>
                <p class="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias consequuntur dolorum tempora. Sapiente, dolorem!</p>
                <p class="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, eligendi?</p>
                <i class="fa fa-twitter text-white" aria-hidden="true"></i>
                <i class="fa fa-facebook text-white banner-icons-margin" aria-hidden="true"></i>
                <i class="fa fa-instagram text-white banner-icons-margin" aria-hidden="true"></i>
                <i class="fa fa-linkedin text-white banner-icons-margin" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default Banner;