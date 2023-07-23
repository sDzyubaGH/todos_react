import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function Navigation({ }: Props) {
  return (
    <nav className='flex justify-between container mx-auto'>
      <div id="logo">
        <Link to='/'>Home</Link>
      </div>
      <div id='pages' className='flex gap-2'>
        <Link to='/history'>History</Link>
        <Link to='/newTodo'>New Todo</Link>
      </div>
    </nav>
  )
}