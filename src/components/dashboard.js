import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductAction , removeProductAction } from '../actions/actions';
import thirdProductPath from '../Images/product-image-3.png';
import $ from 'jquery';
import Navbar from './navbar';
import Banner from './banner';
import Products from './products';
import product from '../constants/products'
import Modal from './modal';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          totalProducts: product.length,
          selectedProductId: product[0].id,
          showModal: false,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.nameInput = React.createRef();
        this.descriptionInput = React.createRef();
      }
    
      removeProduct = (productId) => {
        for (var i = 0; i < product.length; i++) {
          if (product[i].id === productId) {
            product.splice(i, 1);
            this.setState({ totalProducts: product.length });
          }
        }
        this.RemoveProductInReduxState(productId);
      }
    
      handleSubmit = e => {
        e.preventDefault();
        if (this.nameInput.current.value !== "" && this.descriptionInput.current.value !== "") {
            product.push({
            id: (product.length + 1).toString(),
            itemName: this.nameInput.current.value,
            description: this.descriptionInput.current.value,
            Path: thirdProductPath
          })
          this.setState({ totalProducts: product.length });
          this.addProductInReduxState();
          this.handleHide();
        }
      };
    
      handleShow() {
        this.setState({ showModal: true });
      }
    
      handleHide() {
        this.setState({ showModal: false });
      }
    
      addProductInReduxState = () => {
        const params = {
          id: (product.length + 1).toString(),
          itemName: this.nameInput.current.value,
          description: this.descriptionInput.current.value,
          Path: thirdProductPath
        }
        this.props.addProductAction(params);
      }
    
      RemoveProductInReduxState = (productId) => {
        const params = {
          productId: productId,
      }
        this.props.removeProductAction(params);
      }

    render() {
        const modal = this.state.showModal && <Modal>
      <div class="modal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
              <button type="button" class="close" onClick={this.handleHide} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Name:</label>
                  <input type="text" class="form-control" ref={this.nameInput} id="recipient-name" />
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">Description:</label>
                  <textarea class="form-control" ref={this.descriptionInput} id="message-text"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer" onClick={this.handleSubmit}>
              <button type="button" class="btn btn-primary btn-block">Add</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>;
        return (
            <div className="container-fluid">

                <Navbar />
                <Banner />

                <h2 class="text-center"><span>Featured Products</span><span> ({this.state.totalProducts})</span><button onClick={this.handleShow} className="btn btn-primary btn-add text-white">Add product</button></h2>
                <hr class="my-4 hr-line" />
                {modal}
                <div className="container">
                    <div class="row">
                        {
                            product.map((item) => {
                                return (
                                    <Products
                                        id={item.id}
                                        itemName={item.itemName}
                                        path={item.Path}
                                        description={item.description}
                                        selecteditemId={this.state.selectedProductId}
                                        removeProduct={() => this.removeProduct(item.id)}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

// to dispatch action into store
const mapDispatchToProps = dispatch => {
    return {
      addProductAction: (params) => {
        dispatch(addProductAction(params))
      },
      removeProductAction: (params) => {
        dispatch(removeProductAction(params))
      },
    };
  }
  
  // get updated values from store via props
  const mapStateToProps = state => ({
    data: state.productReducer
  })

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);




