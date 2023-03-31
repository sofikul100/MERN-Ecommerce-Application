import React, { Fragment, useEffect } from 'react'
import { Container, Row, } from "react-bootstrap"
import ProductCart from "./PrductCart"
import Alert from 'react-bootstrap/Alert';
import Slider from "./layouts/Slider"
import Spinner from 'react-bootstrap/Spinner';
import { getProduct } from "../REDUX/actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
function Home() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products)


  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])

  return (
    <Fragment>
       <Slider />
      {loading ? (
        <div id="spinner_section">
          <Spinner animation="border" id="loading_spinner" />
        </div>
      ) : error ? <Fragment>
        <Container className='mt-5 mb-5'>
          <Alert variant='warning'>
            <h3>{error}..!!</h3>
          </Alert>
        </Container>
      </Fragment> : (
        <Fragment>
          <div style={{ margin: 'auto', textAlign: 'center', marginTop: "80px", marginBottom: "80px" }}>
            <h3 className='font-bold' style={{ color: '#5D8834' }}> ..Featured ProductS.. </h3>
            <hr />
            <Container style={{ marginTop: '80px' }}>
              <Row>
                {products.map(product => (
                  <ProductCart key={product._id} product={product} />
                ))}
              </Row>
            </Container>
          </div>
        </Fragment>
      )}

    </Fragment>
  )
}
export default Home;