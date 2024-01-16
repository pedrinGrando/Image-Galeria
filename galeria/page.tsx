'use client'
import { Template } from '../../components/Template'
import { ImageCard } from '../../components/ImageCard'
import { useState } from 'react'
import { useImageService } from '@/resources/image/image.service' 
import { Image } from '@/resources/image/image.resource'
import Link from 'next/link'

export default function GaleriaPage(){
  
    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([])
    const [query, setQuery] = useState<string>("")
    const [extension, setExtension] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    async function searchImages(){
      setLoading(true)
       const result = await useService.buscar(query, extension);
       setImages(result);
       setLoading(false)
    }
    function renderImageCard(image: Image){
      return(
         <ImageCard nome={image.name} 
                     src={image.url} 
                     extension={image.extension}
                     tamanho={image.size} 
                     dataUpload={image.uploadDate} />
       )
    }
 
    function renderImageCards(){
         return images.map(image => renderImageCard(image))
    }

    return (
     <Template loading={loading}>

         <section className='flex flex-col items-center justfy-center my-5'>
                
                <div className='flex space-x-4'>
                     <input type="text" 
                             onChange={event => setQuery(event.target.value)} 
                             className='border px-5 py-2 rounded-lg text-gray-900'/>
                      <select onChange={event => setExtension(event.target.value)} className='border px-4 py-2 rounded-lg text-gray-900'>
                          <option value="">All formats</option>
                          <option value="PNG">PNG</option>
                          <option value="JPEG">JPEG</option>
                          <option value="GIF">GIF</option>
                      </select>
                     <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-300' onClick={searchImages}>Search</button>
                     
                     <Link href="/formulario">
                     
                         <button className='bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-300'>Add new</button>

                     </Link>
                </div>
         </section>

         <section className='grid grid-cols-4 gap-8'>

          {
            renderImageCards()
          }

         </section>
     </Template>
    )
}