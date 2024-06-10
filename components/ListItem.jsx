'use client';

import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import Image from 'next/image';

import { pin } from '../lib/ListData'; // Import location pin image from ListData

const ListItem = ({ item, index }) => {
  return (
    // Hello-pangea/dnd draggable component template with conditional sizing and styles
    <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-2 flex items-center bg-white rounded-lg ${
            snapshot.isDragging ? 'shadow-lg border-2 border-gray-200' : 'h-[128px] w-[500px]'
          }`} // Apply conditional classes based on dragging state
          style={{ ...(provided.draggableProps.style || {}), ...(snapshot.isDragging ? { height: '64px', width: '288px' } : {}) }} // Apply styles conditionally based on dragging state
        >
          {/* Image container with conditional sizing and styles */}
          <div className='mx-6'>
            <Image 
              src={item.img} 
              alt={item.location}
              width={snapshot.isDragging ? 32 : 96}
              height={snapshot.isDragging ? 32 : 96}
              className={`${snapshot.isDragging ? 'h-8 rounded-md' : 'h-24 rounded-xl' }`}
              priority
            />
          </div>
          
          {/* List item content */}
          <div>
            <h2 className='font-semibold'>{item.name}</h2> {/* Display item name */}
            <div className='flex items-center text-gray-500'>
              <Image 
                src={pin}
                alt='Location pin icon'
                className={`${snapshot.isDragging ? 'hidden' : 'mr-1' }`}
              />
              {snapshot.isDragging ? null : item.location} {/* Hide location text when dragging */}
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;