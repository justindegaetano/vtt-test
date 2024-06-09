'use client';

import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import ListItem from './ListItem';
import DragIndicator from './DragIndicator';

const DraggableList = ({ items, hoverIndex }) => {
  return (
    <Droppable droppableId="droppable-list">
      {(provided) => (
        <ul
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="rounded-lg"
        >
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {hoverIndex === index && <DragIndicator />}
              <ListItem item={item} index={index} />
            </React.Fragment>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default DraggableList;