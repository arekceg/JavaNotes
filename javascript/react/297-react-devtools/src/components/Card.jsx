import React from "react";
import { Details } from "./Details";

export function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <p>Key = {props.id}</p>
        <h2 className="name">{props.name}</h2>
        <img className="circle-img" src={props.img} alt="avatar_img" />
      </div>
      <div className="bottom">
        <Details email={props.email} tel={props.tel} />
      </div>
    </div>
  );
}

