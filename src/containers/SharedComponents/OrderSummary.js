import { Table, Tag, Space } from "antd";
import React, { Fragment, useCallback, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  add_to_cart,
  restaurant_detail,
  refresh_cart,
} from "../../actions/shop";
import { MainDiv } from "../../style/Restaurants";

const OrderSummary = ({ cart, loading }) => {
  const dispatch = useDispatch();

  console.log(cart);
  console.log('message')

  useEffect(() => {
    dispatch(refresh_cart());
  }, []);

  const columns = [
    {
      title: "ItemID",
      dataIndex: "id",
      key: "id",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Item Detail",
      dataIndex: "item",
      key: "item",
      render: (text) => {
        return (
          <div>
            <h4>{text.title}</h4>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "final_price",
      key: "final_price",
      render: (text) => <h4>{text}</h4>,
    },
  ];

  return (
    <div>
      {loading && <h4>Loading</h4>}
      <MainDiv>
        <Table
          columns={columns}
          dataSource={cart.order_items}
          pagination={true}
          summary={() => {
            return (
              <Fragment>
                <Table.Summary.Row>
                  <Table.Summary.Cell>Total</Table.Summary.Cell>
                  <Table.Summary.Cell></Table.Summary.Cell>
                  <Table.Summary.Cell>{cart.total}</Table.Summary.Cell>
                </Table.Summary.Row>
              </Fragment>
            );
          }}
        />
      </MainDiv>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  restaurant: state.shop.restaurant_detail,
  loading: state.shop.isLoading,
  cart: state.shop.cart,
});

export default connect(mapStateToProps, { restaurant_detail, add_to_cart })(
  OrderSummary
);
