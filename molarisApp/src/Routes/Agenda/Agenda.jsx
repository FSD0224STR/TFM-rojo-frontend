import React from "react";
import { AgendaComponent } from "../../components/AgendaComponents/AgendaComponent";
import { AgendaList } from "../../components/AgendaComponents/AgendaList";
import { Flex } from "antd";

export const Agenda = () => {
  return (
    <div style={{ display: "Flex", gap: "1em" }}>
      <AgendaComponent />
      <AgendaList />
    </div>
  );
};
