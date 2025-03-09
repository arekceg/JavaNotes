import React from 'react';

export function ExamplesDetails({ tabs, tabContent, ContainerType = "menu" }) {
  return <>
    <ContainerType>
      {tabs}
    </ContainerType>
    {tabContent}
  </>;
}
