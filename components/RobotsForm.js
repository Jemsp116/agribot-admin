"use client"
import axios from 'axios';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Spinner from './Spinner';


const RobotsForm = ({
    _id,
    name: existingName,
    description: existingDescription,
    images: existingImages,
    price: existingPrice,
    features: existingFeatures,
    type: existingType,
}) => {
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [form, setForm] = useState({
        name: existingName || '',
        description: existingDescription || '',
        images: existingImages || [],
        price: existingPrice || '',
        features: existingFeatures || [],
        type: existingType || '',
    });

    const saveProduct = async (e) => {
        e.preventDefault();
        // console.log("Submitted Form : ", form);
        if (_id) {
            await axios.put(`/api/robots`, { ...form, _id });
        }
        else {
            await axios.post(`/api/robots`, form);
        }
        setGoToProducts(true);
    }


    const uploadImages = async (ev) => {
        ev.preventDefault();
        const files = ev.target.files;
        for (const file of files) {


            if (!file) return;
            setIsUploading(true);


            // Creating a new FormData object
            const data = new FormData();

            // Setting file in the formdata object
            data.append('file', file);

            // Sending the post request

            const res = await axios.post('/api/upload', data);
            const links = res.data.links;

            console.log("Links : ", links);

            setForm(() => {
                return {...form, images: [ ...form.images, ...links]}
            });

            console.log("Links after setting : ", form.images);
        }
        setIsUploading(false);
    }

    const updateImagesOrder = (imgOrder) => {
        setForm({...form, images: imgOrder});
    }



    const deleteImage = async () => {
        setIsUploading(true);
        let arr = form.bgImage.split('/');
        arr = arr[arr.length - 1];

        await axios.delete(`/api/upload?key=${arr}`);

        setForm({ ...form, bgImage: '' });
        setIsUploading(false);
    }

    if (goToProducts) {
        return redirect('/add-robot');
    }

    const addProperty = () => {
        setForm(prev => {
            return { ...prev, features: [...prev.features, ''] };
        })
    }

    const propertyNameChange = (index, newName) => {
        setForm(prev => {
            const prop = [...prev.features];
            prop[index] = newName;
            return { ...prev, features: [...prop] };
        })

    }

    const removeProperty = (index) => {
        setForm(prev => {
            const newProperties = [...prev.features];
            newProperties.splice(index, 1);
            return { ...prev, features: [...newProperties] };
        })
    }

    return (
        <div>
            <form onSubmit={saveProduct}>
                <label htmlFor="title">Name</label>
                <input type="text" id='name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} name='name' placeholder='Name' />

                <label htmlFor="image">Product Images</label>
                <div className='mb-2 flex flex-wrap gap-2'>
                    <ReactSortable list={form?.images} setList={updateImagesOrder} className='flex gap-2' >
                        {!!form?.images?.length && form.images.map((items, index) => {
                            return (
                                <div key={index} className='bg-white p-2 border border-gray-300 shadow-md rounded-sm h-28'>
                                    <img className='image rounded-lg' src={items} alt="robot-image" />
                                </div>
                            )
                        })}
                    </ReactSortable>
                    {isUploading && (
                        <div className='flex justify-center items-center bg-white shadow-md border border-gray-300 w-28 h-28 rounded-sm cursor-pointer'>
                            <Spinner />
                        </div>
                    )}
                    <label className='flex justify-center items-center gap-1 bg-white shadow-md border border-gray-400 w-28 h-28 rounded-sm cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>

                        <div>
                            Upload
                        </div>
                        <input type="file" onChange={uploadImages} className='hidden' />
                    </label>
                </div>
                {!form?.images?.length && (
                    <div className='text-red-600'>No images for this product !</div>
                )}

                <div className='flex gap-8'>
                    <div className='w-1/2'>
                        <label htmlFor="price">Price</label>
                        <input type="number" id='price' value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} name='price' placeholder='Price' />
                    </div>

                    <div className='w-1/2'>
                        <label htmlFor="price">Type of Robot</label>
                        <select name="type" id="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                            <option value="">Select Robot</option>
                            <option value="Harvesting">Harvesting</option>
                            <option value="Weeding">Weeding</option>
                            <option value="Spraying">Spraying</option>
                            <option value="Aeriel Monitoring">Aeriel Monitering</option>
                        </select>
                    </div>
                </div>

                <div className="my-4">
                    <h1>Key Features of Robot</h1>
                    <button type='button' onClick={addProperty} className='btn-green text-sm'>Add Features</button>
                    {!!form.features?.length && form.features.map((property, index) => {
                        return (
                            <div key={index} className='flex gap-1 mt-2'>
                                <input value={property} onChange={(ev) => { propertyNameChange(index, ev.target.value) }} className='m-0' type="text" placeholder='Features' />
                                <button onClick={() => { removeProperty(index) }} type='button' className='btn-red font-semibold'>Remove</button>
                            </div>
                        )
                    })}
                </div>

                <label htmlFor="description">Description</label>
                <textarea placeholder='Description' id='description' name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} cols="30" rows="4" />

                <button type='submit' className='btn-primary'>Save</button>
            </form>
        </div>
    );
}

export default RobotsForm
