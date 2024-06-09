'use client';

import DraggableList from "@/components/DraggableList";
import { useEffect, useState } from "react";
import { locations as initialItems } from '../lib/ListData.js';
import { DragDropContext } from '@hello-pangea/dnd';

export default function Home() {
  const [items, setItems] = useState(initialItems);
  const [isBrowser, setIsBrowser] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  
  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  const handleOnDragEnd = (result) => {
    setHoverIndex(null); // Reset hover index on drag end
    if (!result.destination) return;

    const updatedItems = Array.from(items);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    setItems(updatedItems);
  };

  const handleOnDragUpdate = (update) => {
    if (!update.destination) {
      setHoverIndex(null);
    } else {
      setHoverIndex(update.destination.index);
    }
  };

  return (
    <>
      {isBrowser ? 
        <DragDropContext onDragEnd={handleOnDragEnd} onDragUpdate={handleOnDragUpdate}>
          <main className="flex items-center justify-center min-h-screen mt-4">
            <div className="w-full max-w-md">
              <DraggableList items={items} hoverIndex={hoverIndex} />
            </div>
          </main>
        </DragDropContext>
      : null}
    </>
  );
}