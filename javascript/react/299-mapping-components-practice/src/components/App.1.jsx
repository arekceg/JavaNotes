import React from "react";
import { emojis } from "./emojis";
import { Header } from "./header";

export function App() {
  return (
    <div>
      <Header />
      <dl className="dictionary">
        {emojis.map(emoji => {
          <div className="term">
            <dt>
              <span className="emoji" role="img" aria-label="Tense Biceps">
                {emoji.emoji}
              </span>
              <span>{emoji.name}</span>
            </dt>
            <dd>
              {emoji.description}
            </dd>
          </div>;
        })}
        <div className="term">
          <dt>
            <span className="emoji" role="img" aria-label="Tense Biceps">
              🙏
            </span>
            <span>Person With Folded Hands</span>
          </dt>
          <dd>
            Two hands pressed together. Is currently very introverted, saying a
            prayer, or hoping for enlightenment. Is also used as a “high five”
            or to say thank you.
          </dd>
        </div>
        <div className="term">
          <dt>
            <span className="emoji" role="img" aria-label="Tense Biceps">
              🤣
            </span>
            <span>Rolling On The Floor, Laughing</span>
          </dt>
          <dd>
            This is funny! A smiley face, rolling on the floor, laughing. The
            face is laughing boundlessly. The emoji version of “rofl“. Stands
            for „rolling on the floor, laughing“.
          </dd>
        </div>
      </dl>
    </div>
  );
}
