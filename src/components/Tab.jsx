import React from 'react'

import { useSnapshot } from 'valtio'
import state from '../store';

const Tab = ({tab, isFilterTab, isActiveTab, handleClick, icon}) => {
  const snap = useSnapshot(state);
  const activeStyles = isFilterTab && isActiveTab? {backgroundColor: snap.color, opacity: 0.5} : {backgroundColor: "transparent", opacity: 1}
  return (
    <div
    key={tab}
    className={`tab-btn ${isFilterTab? "rounded-full glassmorphism": "rounded-4"}`}
    onClick={handleClick}
    style={activeStyles}
    >
      <img src={icon} alt={tab} className={`${isFilterTab? 'w-4/5 h-4/5': 'w-4/5 h-4/5'}`} />
      
    </div>
  )
}

export default Tab
