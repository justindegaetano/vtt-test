'use client';

import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import ListItem from './ListItem';
import DragIndicator from './DragIndicator';

const DraggableList = ({ items, hoverIndex }) => {
  return (
    // Droppable component to specify the drop zone
    <Droppable droppableId="droppable-list">
      {(provided) => (
        <ul
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="rounded-lg"
        >
          {/* Map over items to render each list item */}
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {/* Conditionally render the DragIndicator if hoverIndex matches current index */}
              {hoverIndex === index && <DragIndicator />}
              {/* Render the ListItem component */}
              <ListItem item={item} index={index} />
            </React.Fragment>
          ))}
          {/* The fly in the ointment... */}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default DraggableList;