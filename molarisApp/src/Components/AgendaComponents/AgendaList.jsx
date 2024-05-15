import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton } from "antd";
const count = 3;

export const AgendaList = () => {
  return (
    <div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name?.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};
