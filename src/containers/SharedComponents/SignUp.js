import React, { Fragment } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { MainDiv } from "../../style/Login";
import { Cascader } from "antd";
import { Radio } from "antd";

import { Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Item from "antd/lib/list/Item";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const SignUp = () => {
  const onFinish = (values) => {
    if (typeOfAccount === 1) {
      console.log(values, typeOfAccount, 1);
    } else if (typeOfAccount === 2) {
      console.log(values, typeOfAccount, 2);
    } else if (typeOfAccount === 3) {
      console.log(values, typeOfAccount, 3);
    } else {
      console.log("somethings wrong");
    }
  };

  const [typeOfAccount, setTypeOfAccount] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setTypeOfAccount(e.target.value);
  };

  const restaurantFields = () => {
    return (
      <Fragment>
        <Form.Item
          name={["restaurant", "name"]}
          label="Restaurant name"
          rules={[
            {
              type: "name",
              required: true,
            },
          ]}
        >
          <Input placeholder={"Restaurant name"} />
        </Form.Item>
        <Form.Item
          name={["restaurant", "adress"]}
          label="Restaurant adress"
          rules={[
            {
              type: "adress",
              required: true,
            },
          ]}
        >
          <Input placeholder={"Restaurant adress"} />
        </Form.Item>
        <Form.Item
          name={["restaurant", "phone"]}
          label="Owner phone number"
          rules={[
            {
              type: "adress",
              required: true,
            },
          ]}
        >
          <Input placeholder={"Owner phone number"} />
        </Form.Item>
      </Fragment>
    );
  };

  const deliverer = () => {
    return (
      <Fragment>
        <Form.Item
          name={"vehicle"}
          label="Vehicle"
          rules={[
            {
              type: "string",
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter vehicle type"} />
        </Form.Item>
      </Fragment>
    );
  };

  return (
    <MainDiv>
      <h1>Create your account</h1>
      <Radio.Group onChange={onChange} value={typeOfAccount}>
        <Radio value={1}>Customer</Radio>
        <Radio value={2}>Seller</Radio>
        <Radio value={3}>Deliverer</Radio>
      </Radio.Group>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name={["user", "password"]}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          label="Retype password"
          name={["user", "re_password"]}
          rules={[
            {
              required: true,
              message: "Please retype your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="retype password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        {typeOfAccount === 1
          ? null
          : typeOfAccount === 2
          ? restaurantFields()
          : deliverer()}
        <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </MainDiv>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignUp);
