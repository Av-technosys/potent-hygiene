"use client";

import { useState } from "react";

export default function ImageUpload() {

  const [file,setFile] = useState<File | null>(null)
  const [url,setUrl] = useState("")

  const uploadImage = async ()=>{

    if(!file) return

    const formData = new FormData()
    formData.append("file",file)

    const res = await fetch("/api/upload",{
      method:"POST",
      body:formData
    })

    const data = await res.json()

    setUrl(data.url)
  }

  return (
    <div>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files?.[0] || null)}
      />

      <button onClick={uploadImage}>
        Upload
      </button>

      {url && <img src={url} width={200}/>}

    </div>
  )
}