import React from "react";
import { emojis } from "./emojis";

export function EmojiDictonary() {
  return (
    <dl className="dictionary">
      {emojis.filter(emoji=>emoji.name.includes("a")).map((emoji) => (
        <EmojiEntry key={emoji.id} emoji={emoji} />
      ))}
    </dl>
  );
}

function EmojiEntry({ emoji }) {
  const { emoji: symbol, name, description } = emoji;
  const truncatedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;

  return (
    <div className="term">
      <dt>
        <span className="emoji" role="img" aria-label={name}>
          {symbol}
        </span>
        <span>{name}</span>
      </dt>
      <dd>{truncatedDescription}</dd>
    </div>
  );
}

