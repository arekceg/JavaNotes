  import { CORE_CONCEPTS } from "../data";
  import CoreConcept from "./CoreConcept";
import React from 'react';

  export default function CoreConcepts() {
    return <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {CORE_CONCEPTS.map((conceptItem) => (
          <CoreConcept key={conceptItem.title} {...conceptItem} />
        ))}
      </ul>
    </section>;
  }