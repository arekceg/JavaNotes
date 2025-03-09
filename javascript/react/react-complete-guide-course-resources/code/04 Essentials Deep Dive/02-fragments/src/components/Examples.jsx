import { useState } from 'react';

import React from 'react';
import TabButton from './TabButton.jsx';
import { EXAMPLES } from '../data.js';
import { ExamplesDetails } from './ExamplesDetails.jsx';

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedButton);
    // console.log(selectedTopic);
  }

  console.log('APP COMPONENT EXECUTING');

  let tabContent = <p>Please select a topic.</p>;

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }

  const tabs =
    <>
      <TabButton
        isSelected={selectedTopic === 'components'}
        onSelect={() => handleSelect('components')}
      >
        Components
      </TabButton>
      <TabButton
        isSelected={selectedTopic === 'jsx'}
        onSelect={() => handleSelect('jsx')}
      >
        JSX
      </TabButton>
      <TabButton
        isSelected={selectedTopic === 'props'}
        onSelect={() => handleSelect('props')}
      >
        Props
      </TabButton>
      <TabButton
        isSelected={selectedTopic === 'state'}
        onSelect={() => handleSelect('state')}
      >
        State
      </TabButton>
    </>

  return (
    <>
      <section id="examples">
        <h2>Examples</h2>
        <ExamplesDetails tabs={tabs} tabContent={tabContent} ContainerType="menu" />
      </section>
    </>
  );
}

