import React, {useState, useEffect} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import {AiPicker, ColorPicker, FilePicker, Tab, CustomButton} from "../components"

import config from '../config/config'
import state from '../store'
import {download, logoShirt, stylishShirt} from "../assets"
import {downloadCanvasToImage, reader} from '../config/helpers'
import {EditorTabs, FilterTabs, DecalTypes} from "../config/constants"
import { fadeAnimation, slideAnimation } from '../config/motion'

const Cutomiser = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [isPopUp, setIsPopUp] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false)

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  });

  const generateTabContent = ()=>{
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile}/>
      case "aipicker":
        return <AiPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />  
      default:
        return null;
    }
  }

  const handleSubmit = async (type)=>{
    if (!prompt) {
      return alert("Please Enter Prompt")
    }
    try {
      //backend call
      setGeneratingImg(true);
      const response = await fetch("http://localhost:3000/api/v1/dalle", {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt
        })
      })
      const data = await response.json();
      handleDecals(type, data)
    } catch (error) {
      alert(error)
    }finally{
      setGeneratingImg(false);
      setActiveEditorTab("")
    }
  }

  const handleActiveFilterTab = (tabName)=>{
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName]
        break;
       case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName] 
      break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }
    setActiveFilterTab((prev)=> {
      return{
        ...prev,
        [tabName]: !prev[tabName]
      }
    })
  }
  const  handleDecals = (type, result)=>{
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }
  const readFile = (type)=>{
    reader(file)
    .then((result)=>{
      handleDecals(type, result);
      setActiveEditorTab("")
    })
  }
  
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
        <motion.div
        key="custom"
        className="absolute top-0 left-0 z-10"
        {...slideAnimation('left')}
        >
          <div className='flex items-center min-h-screen '>
            <div className='editortabs-container tabs'>
              {EditorTabs.map((tab)=>(
                <Tab 
                key={tab.name} 
                tab={tab.name} 
                icon={tab.icon} 
                handleClick={()=> {
                  setActiveEditorTab(tab.name)
                  setIsPopUp((prev)=>!prev)
                }}/>
              ))}
              {isPopUp && generateTabContent()}
            </div>
          </div>
        </motion.div>
        <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
              <CustomButton title="Go Back" type="filled" handleClick={()=> state.intro = true} 
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
              />
        </motion.div>
        <motion.div className="filtertabs-container" {...slideAnimation("up")}>
        {FilterTabs.map((tab)=>(
                <Tab isFilterTab isActiveTab={activeFilterTab[tab.name]} key={tab.name} tab={tab.name} icon={tab.icon} handleClick={()=> {handleActiveFilterTab(tab.name)}}/>
              ))}
        </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Cutomiser
