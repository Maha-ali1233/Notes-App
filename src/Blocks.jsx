import React, {useState} from 'react'

const Blocks = () => {

    const [blocks, addBlocks] = useState(
        [
        ]
    )
  



const handleAddBlock = (e)=>{

e.preventDefault()
  const newBlock = {
    id: blocks.length +1,
    title: "New",
    content: ""
  }

  addBlocks([newBlock, ...blocks]);
};

const handleDelete =(e, blockID)=>{

  e.stopPropagation();
  const updatedBlocks = blocks.filter((block) => block.id !==blockID )

  addBlocks(updatedBlocks);
};

  return (

    <div className='flex flex-wrap max-w-[800px] justify-center'>
        {blocks.map((block) => (
            <div 
            key={block.id}
            className='p-10 bg-pink-300 '
            > 
            <header
            className='mt-0 flex justify-end text-red-800 cursor-pointer'
            onClick={(e) =>handleDelete(e, block.id)}
            >
              x
            </header>
            <h1>{block.title}</h1>
            </div>
        ))}
        <div><button 
        onClick={(e) => handleAddBlock(e)}
        className='p-3 bg-pink-600'
        >Add Block</button></div>
    </div>
  )
}

export default Blocks