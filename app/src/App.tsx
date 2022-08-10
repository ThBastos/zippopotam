import React, { useState } from "react";
import { Button, Row, Col, Form, Input, Divider, Select, Space } from "antd";
import { listCountries } from "./data/countries";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GetZipCode } from "./components/ZipCodeInfos";
import History from "./components/History";

const errorLink = onError(() => {
  console.log("Error");
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  const [country, setCountry] = useState("US");
  const [zipCode, setZipCode] = useState("90210");
  const [SendCountry, setSendCountry] = useState(listCountries[57].key);
  const [SendZipCode, setSendZipCode] = useState("");
  const [history, setHistory] = useState([]);

  const { Option } = Select;

  const onFinish = (values: any) => {
    setSendCountry(country);
    setSendZipCode(zipCode);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Row
          align="middle"
          justify="center"
          gutter={12}
          style={{ marginTop: "40px" }}
        >
          <Col xs={24} xl={8}>
            <h2>Choose the country and enter the zip code</h2>
            <Form
              name="basic"
              initialValues={{ country: "US", zipcode: "90210" }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: "Please input the country" },
                ]}
              >
                <Select
                  value={country}
                  defaultValue="US"
                  onSelect={(value: any) => setCountry(value)}
                >
                  {listCountries.map((option) => {
                    return (
                      <Option key={option.key} value={option.key}>
                        {option.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Zip Code"
                name="zipcode"
                rules={[
                  { required: true, message: "Please input the zip code" },
                ]}
              >
                <Input
                  type="number"
                  size={"large"}
                  pattern="[+-]?\d+(?:[.,]\d+)?"
                  value={zipCode}
                  defaultValue={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={10} xs={24} xl={12} style={{ margin: "20px" }}>
            <GetZipCode
              ICountry={SendCountry}
              IzipCode={SendZipCode}
              setHistory={setHistory}
              history={history}
            />
          </Col>
          <Col span={10}>
            <History history={history} />
          </Col>
        </Row>
      </div>
    </ApolloProvider>
  );
}

export default App;
