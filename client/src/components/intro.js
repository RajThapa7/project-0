import React,{useState} from 'react'
import { Link } from "react-router-dom";
export default function Intro() {
  return (
      <>
      <h2>Welcome to Ghar ghar sewa</h2>
      <Link to="client">I am a client</Link>
      <Link to="technician">I am a technician</Link>
      </>
  )
}
