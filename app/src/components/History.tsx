import React from "react";
import { List } from "antd";

function ListHistory({ history }: any) {
  return (
    history && (
      <List
        header={<div>Last search's</div>}
        bordered
        dataSource={history}
        renderItem={(history: any) => (
          <List.Item>{history.getZipCodeInfos.postCode}</List.Item>
        )}
      ></List>
    )
  );
}

export default ListHistory;
