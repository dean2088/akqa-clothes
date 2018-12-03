import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';
import { connect } from 'react-redux';
import { bindActions } from 'helpers/bindDispatch';

import ProductIteml from 'components/ProductItem/ProductItem';

//redux
import {
  load,
} from 'redux/modules/me';

@connect(state => ({
  me: state.me
}), bindActions({
  load
}))
export default class Home extends React.Component {

  static propTypes = {
    load: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      size: 'all'
    };

    this.sizeOrder = ['XS', 'S', 'M', 'L', 'XL'];
  }

  componentWillMount() {
    this.props.load();
  }

  handleSelect = (e) => {
    this.setState({
      size: e.currentTarget.value
    });
  };

  render() {
    const products = this.props.me.result;
    const { size } = this.state;

    const sizes = products.reduce((accumulator, item) => (
      [...new Set([...accumulator, ...item.size])]
    ), []).slice().sort((a, b) => this.sizeOrder.indexOf(a) - this.sizeOrder.indexOf(b));

    return (
      <div className={styles.content}>
        <header>
          <div>
            <div>Women's top</div>
            <select value={this.state.size} onChange={this.handleSelect}>
              <option value="all">Filter by size</option>
              {sizes.map(item => (
                <option value={item} key={item}>{item}</option>
              ))}
            </select>
          </div>
        </header>
        <div className={styles.products}>
          {products.filter(product => size === 'all' || product.size.indexOf(size) > -1).map((item) => (
            <ProductIteml
              imageLink={require(`sources/images/Products/${item.productImage}`)}
              key={item.index}
              {...item}
            />
          ))}
        </div>
      </div>
    );
  }
}
