'use client';

import DraggableList from "@/components/DraggableList";
import { useEffect, useState } from "react";
import { locations as initialItems } from '../lib/ListData.js';
import { DragDropContext } from '@hello-pangea/dnd'; 

export default function Home() {
  const [items, setItems] = useState(initialItems); // State to manage list items, defaulting to ListData.js entries
  const [isBrowser, setIsBrowser] = useState(false); // State to check if running in browser
  const [hoverIndex, setHoverIndex] = useState(null); // State to track hovered index during drag

  // useEffect to check if window object is available, confirming if running in the browser
  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  // Handler for when drag ends
  const handleOnDragEnd = (result) => {
    setHoverIndex(null); // Reset hover index on drag end
    if (!result.destination) return; // If no destination, exit

    // Create a new array with reordered items after item is dropped to new index
    const updatedItems = Array.from(items);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    // Update state with new item order
    setItems(updatedItems);
  };

  // Handler for drag updates
  const handleOnDragUpdate = (update) => {
    if (!update.destination) {
      setHoverIndex(null); // Reset hover index if no destination
    } else {
      setHoverIndex(update.destination.index); // Set hover index to current destination index
    }
  };

  return (
    <>
      {isBrowser ? (
        // Wrap in DragDropContext to enable drag and drop functionality
        <DragDropContext onDragEnd={handleOnDragEnd} onDragUpdate={handleOnDragUpdate}>
          <main className="flex items-center justify-center min-h-screen mt-4">
            <div className="w-full max-w-md">
              {/* Pass items and hoverIndex to DraggableList component */}
              <DraggableList items={items} hoverIndex={hoverIndex} />
            </div>
          </main>
        </DragDropContext>
      ) : null}
    </>
  );
}
